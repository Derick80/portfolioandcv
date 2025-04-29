import prisma from "@/lib/prisma"


export const getPosts = async () => {
    return await prisma.mdxPost.findMany({
        include:{
likes:true
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
}

export const getPostDataById = (postId:string)=> {
    return prisma.mdxPost.findUnique({
        where: {
            id: postId,
        },
        include:{
            likes:true
        }
    })
}