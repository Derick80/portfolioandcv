import { auth } from "@/auth";
import { createChat, getUserChatList } from "../actions/chat";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import NewChatButton from "@/components/new-chat";

export default async function ChatPage() {
  const session = await auth();
  if (!session) {
    return (
      <div className="container flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Please log in</h1>
        <p className="mt-4 text-lg">
          You need to be logged in to access this page.
        </p>
      </div>
    );
  }
  const user = session.user;
  if (!user) {
    return (
      <div className="container flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Please log in</h1>
        <p className="mt-4 text-lg">
          You need to be logged in to access this page.
        </p>
      </div>
    );
  }

  const userId = user.id;
  if (!userId) return null;
  console.log(userId, "userId");
  const chats = await getUserChatList(userId);
  return (
    <div className="container flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">AI Chat App</h1>
      <Link href="/chat/new">
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </Link>
      <main className="flex-1 container py-8">
        <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>

        {chats.length === 0 ? (
          <NewChatButton userId={userId} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {chats.map((chat) => (
              <Link key={chat.id} href={`/chat/${chat.id}`} className="block">
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <h3 className="font-medium truncate">
                    {chat.title || "New Conversation"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(chat.createdAt).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
