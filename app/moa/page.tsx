import { auth } from "@/auth";
import MoaInput from "./moa-input";
import { redirect } from "next/navigation";


export default async function Page() {
const session = await auth();
    if (!session) {

      redirect  ("/login");
    }
    return (
        <div className="flex h-screen w-full border-2">
      <MoaInput 
        />  
        </div>
    );
}