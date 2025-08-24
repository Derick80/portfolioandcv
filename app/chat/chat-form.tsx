"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { saveMessage } from "../actions/chat";

const ChatForm = ({ userId, chatId }: { chatId: string; userId: string }) => {
  const [state, action, isPending] = React.useActionState(saveMessage, null);
  return (
    <div className="border-t w-full p-4">
      <form action={action} className="max-w-3xl mx-auto flex gap-2">
        <input type="hidden" name="chatId" value={chatId} />
        <input type="hidden" name="role" value="user" />
        <input type="hidden" name="userId" value={userId} />
        <Input
          name="content"
          placeholder="Type your message here..."
          className="flex-1"
        />
        <Button type="submit" disabled={isPending}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatForm;
