import { getChatById } from "@/app/actions/chat";
import { auth } from "@/auth";
import MessageDisplay from "../message-display";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import ChatForm from "../chat-form";

export default async function Page(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await props.params;
  if (!id) {
    return <div>Page not found</div>;
  }
  const session = await auth();
  if (!session) redirect("/auth/login");
  const userId = session?.user?.id;
  if (!userId) redirect("/auth/login");
  const chat = await getChatById(id, userId);

  if (!chat) {
    return (
      <div className="container flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Chat not found</h1>
        <p className="mt-4 text-lg">This chat does not exist.</p>
      </div>
    );
  }
  return (
    <div className="container  mx-auto flex flex-col items-center ">
      <Card className="w-full  mx-auto mt-4">
        <CardHeader>
          <CardDescription>Chat Title: {chat.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <MessageDisplay chatId={id} />
        </CardContent>
        <CardFooter className="w-full">
          <ChatForm chatId={id} userId={userId} />
        </CardFooter>
      </Card>
    </div>
  );
}
