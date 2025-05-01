import { getChatById } from "@/app/actions/chat"
import { auth } from "@/auth"


export default async function Page(props: {
    params: Promise<{
        id: string
    }>
}

){
    const { id } = await props.params
    if(!id){
        return <div>Page not found</div>
    }
    const session = await auth()
    if (!session) {
        return (
            <div className="container flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Please log in</h1>
                <p className="mt-4 text-lg">You need to be logged in to access this page.</p>
            </div>
        )
    }
    const user = session.user
    if(!user){
        return (
            <div className="container flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Please log in</h1>
                <p className="mt-4 text-lg">You need to be logged in to access this page.</p>
            </div>
        )
    }
    
    const chat = await getChatById(id, user.id)
    if(!chat){  
        return (
            <div className="container flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Chat not found</h1>
                <p className="mt-4 text-lg">This chat does not exist.</p>
            </div>
        )
    }
    console.log(chat, "chat")
    return (
        <div>
            <h1>Page</h1>
        </div>
    )
}