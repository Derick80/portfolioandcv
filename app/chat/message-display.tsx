import { auth } from "@/auth";
import { getChatById } from "../actions/chat";
import { redirect } from "next/navigation";
import { KanjiChatResponse } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MessageDisplay = async ({ chatId }: { chatId: string }) => {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const userId = session?.user?.id;
  if (!userId) redirect("/auth/login");
  const chat = await getChatById(chatId, userId);
  const messages = chat?.messages;

  return (
    <div className="container flex flex-col justify-center">
      <p className="mt-4 text-lg">Chat Messages:</p>
      <ul className="list-disc flex-1">
        {messages?.map((message) => (
          <li key={message.id} className="mt-2">
            <p className="font-bold">
              {message.role === "user" ? "User" : "AI Response"}:
            </p>
            {message.role === "user" ? (
              <p>{message.content}</p>
            ) : (
              <div>
                <p className="text-sm text-gray-500">
                  `Here is the information you requested: hover over the
                  japanese sentence to see the english translation`
                </p>

                {/* concate the inputword and additional vocab */}
                {parseAIMessage(JSON.parse(message.content))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageDisplay;

const parseAIMessage = (content: KanjiChatResponse) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="text-2xl font-semibold capitalize">
            {content.input_word.meaning}
          </p>
          <p className="text-4xl font-bold">{content.input_word.kanji}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold">Kanji:</span> {content.input_word.kanji}
        </p>
        <p>
          <span className="font-bold">Kana:</span> {content.input_word.kana}
        </p>
        {/* stroke number */}
        <p>
          <span className="font-bold">Strokes:</span>{" "}
          {content.input_word.stroke_number}
        </p>
        {/* JLPT level */}
        <p>
          <span className="font-bold">JLPT:</span> N{content.input_word.jlpt}
        </p>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <span className="font-semibold">Japanese Sentence:</span>
                <p className="whitespace-pre-wrap">
                  {content.input_word.sentence_jp}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="whitespace-pre-wrap">
                {content.input_word.sentence_en}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 md:gap-4 items-start">
        <p className="font-bold">Related Kanji:</p>
        <div className="flex flex-row gap-2 md:gap-4 flex-wrap w-full">
          {content.additional_vocab &&
            content.additional_vocab.length > 0 &&
            content.additional_vocab.map((vocab) => (
              <Card key={vocab.kanji}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <p className="text-2xl font-semibold capitalize">
                      {vocab.meaning}
                    </p>
                    <p className="text-4xl font-bold">
                      {content.input_word.kanji}
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <span className="font-bold">Kanji:</span>{" "}
                    {content.input_word.kanji}
                  </p>
                  <p>
                    <span className="font-bold">Kana:</span>{" "}
                    {content.input_word.kana}
                  </p>
                  {/* stroke number */}
                  <p>
                    <span className="font-bold">Strokes:</span>{" "}
                    {content.input_word.stroke_number}
                  </p>
                  {/* JLPT level */}
                  <p>
                    <span className="font-bold">JLPT:</span> N
                    {content.input_word.jlpt}
                  </p>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <span className="font-semibold">
                            Japanese Sentence:
                          </span>
                          <p className="whitespace-pre-wrap">
                            {content.input_word.sentence_jp}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="whitespace-pre-wrap">
                          {content.input_word.sentence_en}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            ))}{" "}
        </div>
      </CardFooter>
    </Card>
  );
};
