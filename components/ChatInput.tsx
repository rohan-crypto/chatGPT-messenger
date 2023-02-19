'use client';

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react';
import { toast } from "react-hot-toast";
import ModelSelection from './ModelSelection';
import useSWR from "swr";

type Props = {
    chatId: string;
};

function ChatInput({chatId}: Props) {
  
  const [prompt, setPrompt] = useState(""); 
  const {data: session} = useSession(); 

  // useSWR to get model
  // const model = "text-davinci-003";
  const {data: model} = useSWR('model',{
    fallbackData: 'text-davinci-003'
  });
  
// To know the type of e. Go to form onSubmit={e => sendMessage}.
// Then check the type of e in onSubmit. use the same type in function.
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
        text: input,
        createdAt: serverTimestamp(),
        user: {
            _id: session?.user?.email!,
            name: session?.user?.name!,
            avatar: session?.user?.image! || 
                `https://ui-avatars.com/api/?name=${session?.user?.name}`,
            // this api creates avatar based on name
        }
    }

    // this will add message in the database
    await addDoc(
        collection(db, 'users', session?.user?.email!, 'chats', chatId, 
        'messages'), message
    )

    //Toast Notification to say loading
    const notification = toast.loading('ChatGPT is thinking...');

    await fetch("/api/askQuestion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: input,
            chatId,
            model,
            session,
        }),
    }).then(() => {
        //Toast notification to say successful
        toast.success('ChatGPT has responded!', {
            id: notification,
        })
    });
  };

  return (
    <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm'>
        <form onSubmit={sendMessage} className='p-5 space-x-5 flex'>

            {/* if there is not session input will be disabled */}
            <input value={prompt} type="text" disabled={!session}
            className='bg-transparent focus:outline-none flex-1
            disabled:text-gray-300 disabled:cursor-not-allowed'
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Type your message here...'/>

            {/* disabled condition is the auth for button */}
            {/* if prompt is not present then disable the button i.e. if nothing
            is typed in chat*/}
            <button type="submit" disabled={!prompt || !session}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold
            px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-gray-300">
                <PaperAirplaneIcon className="h-4 w-4 -rotate-45"/>
            </button>

        </form>

        <div className='md:hidden'>
            {/* ModelSelection */}
            <ModelSelection/>
        </div>
    </div>
  )
}

export default ChatInput