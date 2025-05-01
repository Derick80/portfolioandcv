'use server'
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { z } from "zod"

const userIdParams = z.object({
    userId: z.string(),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createChat = async (prevState:any,formData:FormData) => {
    const validatedData = userIdParams.safeParse({
        userId: formData.get("userId"),
        
    })
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
        }
    })
    redirect(`/chat/${chat.id}`)
}



export const getUserChatList = async (
    userId: string
) => {
   

    const userChatList = await prisma.chat.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    return userChatList
}



export const getChatById = async (chatId: string,userId:string) => {
    return await prisma.chat.findUnique({
        where: {
            id: chatId,
            userId: userId,
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    })

}



export const saveMessage = async ({chatId, content, role}:{
    chatId:string,
    content:string,
    role: string
}) => {
    const messageCount = await prisma.message.count({
        where: {
             chatId,
        },
    })

    if(messageCount === 0 && role === 'user'){
        await prisma.chat.update({
            where: {
                id: chatId,
            },
            data: {
                title: content.slice(0,100)
            },
        })
    }

    return await prisma.message.create({
        data: {
            chatId,
            content,
            role,
        },
    })
    
}