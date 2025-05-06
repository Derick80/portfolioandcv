'use client'
import { createChat } from "@/app/actions/chat"
import { Button } from "./ui/button"
import { PlusIcon } from "lucide-react"
import React from "react"



const NewChatButton = ({userId}:{userId:string}) => {
const [state,action, isPending] = React.useActionState(createChat,null)
    return(

    <form action={action}>
    <input type="hidden" name="userId" value={userId} />
  <Button type="submit" 
  disabled={isPending}
  >
    <PlusIcon className="w-4 h-4 mr-2" />
    New Chat
  </Button>
</form>
    )
}

export default NewChatButton