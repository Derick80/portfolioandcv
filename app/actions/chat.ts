"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import OpenAI from "openai";

const openai_key = process.env.OPENAI_API_KEY;
if (!openai_key) {
  throw new Error("OpenAI API key not found");
}

const openai = new OpenAI({ apiKey: openai_key });

const userIdParams = z.object({
  userId: z.string(),
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createChat = async (prevState: any, formData: FormData) => {
  const validatedData = userIdParams.safeParse({
    userId: formData.get("userId"),
  });
  if (!validatedData.success) {
    console.error("Validation failed:", validatedData.error);
    return;
  }
  const { userId } = validatedData.data;
  if (!userId) {
    console.error("User ID is required");
    return;
  }
  const chat = await prisma.chat.create({
    data: {
      userId: userId,
      title: "New Chat",
    },
  });
  redirect(`/chat/${chat.id}`);
};

export const getUserChatList = async (userId: string) => {
  const userChatList = await prisma.chat.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return userChatList;
};

export const getChatById = async (chatId: string, userId: string) => {
  return await prisma.chat.findUnique({
    where: {
      id: chatId,
      userId: userId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
};

const messageSchema = z.object({
  chatId: z.string(),
  content: z.string(),
  role: z.string(),
  userId: z.string(),
});

export const saveAIResponse = async ({
  aiResponse,
  chatId,
  userId,
}: {
  aiResponse: string;
  chatId: string;
  userId: string;
}) => {
  // Implement the logic to save the AI response to the database
  console.log(aiResponse, "ai response");
  const parsed = JSON.parse(aiResponse);
  const { input_word, additional_vocab } = parsed;
  // console.log(parsed, "parsed")
  const message = await prisma.message.create({
    data: {
      chatId,
      content: JSON.stringify(input_word),
      role: "ai",
    },
  });
  if (!message) {
    console.error("Message not created");
    return;
  }
  // Save additional vocab if needed
  for (const vocab of additional_vocab) {
    await prisma.message.create({
      data: {
        chatId,
        content: JSON.stringify(vocab),
        role: "ai",
      },
    });
  }
};
export const generateAiResponse = async ({
  message,
  chatId,
  userId,
}: {
  message: string;
  chatId: string;
  userId: string;
}) => {
  // Implement the logic to send the message to the AI and get the response
  const prompt = `
Generate valid JSON with this shape:
{
  input_word: {kanji, kana, meaning, jlpt, stroke_number, sentence_jp, sentence_en, queryKanji:true},
  additional_vocab: Array<4 objects>(same keys, queryKanji:false)
}

Return ONLY JSON.

Kanji Input: ${message}`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a JSON-only assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0,
    });
    //   the responsre is in the form of a completion object which I barely know what it is

    const raw = completion.choices[0].message?.content;
    if (!raw) throw new Error("OpenAI returned empty response");
    const cleanedRaw = raw.replace(/```json|```/g, "").trim();
    // return {
    //     response: cleanedRaw,
    //     success: true
    // }
    //  modify this to save the response to the database.
    const generatedresponse = await saveAIResponse({
      aiResponse: cleanedRaw,
      chatId: chatId,
      userId: userId,
    });
    console.log(generatedresponse, "generated response");
    return {
      response: cleanedRaw,
      success: true,
    };
  } catch (error) {
    console.error(`Error generating kanji response: ${error}`);
    return {
      response: "",
      errors: {
        aiGeneration: "Error generating AI kanji response",
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveMessage = async (prevState: any, formData: FormData) => {
  const validatedData = messageSchema.safeParse({
    chatId: formData.get("chatId"),
    content: formData.get("content"),
    role: formData.get("role"),
    userId: formData.get("userId"),
  });
  if (!validatedData.success) {
    console.error("Validation failed:", validatedData.error);
    return;
  }

  const { chatId, content, role, userId } = validatedData.data;

  const messageCount = await prisma.message.count({
    where: {
      chatId,
    },
  });

  if (messageCount === 0 && role === "user") {
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        title: content.slice(0, 100),
      },
    });
  }
  // modify this to create a new message and then send the messages to the Ai.
  const created = await prisma.message.create({
    data: {
      chatId,
      content,
      role,
    },
  });
  if (!created) {
    console.error("Message not created");

    return;
  }
  // send the message to the ai.  So write the function to send the message to the ai.

  return await generateAiResponse({
    message: content,
    chatId,
    userId,
  });
};
