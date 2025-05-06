import { auth } from "@/auth"
import { getChatById } from "../actions/chat"
import { redirect } from "next/navigation"

const MessageDisplay = async ({chatId}:{
    chatId:string
})=>{
    const session = await auth()
    if(!session) redirect('/auth/login')
    
        const userId = session?.user?.id
    if(!userId) redirect('/auth/login')
    const chat = await getChatById(chatId, userId)
const messages = chat?.messages


    return(
        <div className="container flex flex-col justify-center h-scresen">
            
            <p className="mt-4 text-lg">Chat Messages:</p>
            <ul className="list-disc">
                {messages?.map((message) => (
                    <li key={message.id} className="mt-2">
                        <p className="font-bold">{message.role}</p>
                       {
                        message.role === 'user' ? ( <p>{message.content}</p>):(
                            // put complicated AI response here -- use the cards for the kanji I made before and see how that works. 
                            <>
                            {/* <DisplayQuery
                            {
                                // parse the message content to get the kanji and other info

                                ...JSON.parse(message.content)

                            }
                            /> */}
                            <p>{message.content}</p>
                            </>
                        )
                       }
                        
                    </li>
                ))}
            </ul>
        </div>  
    )



}


export default MessageDisplay