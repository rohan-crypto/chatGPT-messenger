import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { db } from "../firebase";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";


// in type script we define like this 
type Props = {
    id: string;
  }

function ChatRow({id}:Props) {

  const pathname = usePathname();
  const router = useRouter();
  const {data: session} = useSession();
  const [active, setActive] = useState(false);

  // by this query we will get the messages in ascending order of created At
  const [messages] = useCollection(
    collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
  );

  // so this will make the current chat Active
  useEffect(() => {
    if(!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    // delete chat based on query and redirect to homescreen. 
    // It will be automatically linked with db 
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  }

  return (
    <Link href={`/chat/${id}`} className={`chatRow justify-center 
    ${active && "bg-gray-700/50"}`}>
      <ChatBubbleLeftIcon className="h-5 w-5"/>
      <p className="flex-1 hidden md:inline-flex truncate">
        {/* pull the last messages or new chat */}
        {messages?.docs[messages?.docs.length-1]?.data().text || "New Chat"}
      </p>
      <TrashIcon onClick={removeChat} 
      className="h-5 w-5 text-gray-700 hover:text-red-700"/>
    </Link>
  )
}

export default ChatRow