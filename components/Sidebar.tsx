// since we are using hooks we need to make Sidebar.tsx client-side
'use client'

import { useSession, signOut } from 'next-auth/react';
import {useCollection} from 'react-firebase-hooks/firestore';
import React from 'react'
import NewChat from './NewChat';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';


function Sidebar() {
  const {data: session} = useSession();

  const [chats, loading, error] = useCollection(
    // we will be real-time listening to chats from db
    // all the new chats will be created at the bottom as per the query
    session && query(
      collection(db, "users", session.user?.email!, "chats"),
      orderBy('createdAt', 'asc')
    )
  );

  // console.log(chats);

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* New chat button */}
          <NewChat/>
          
          <div className='hidden sm:inline'>
            {/* Model Selection */}
            <ModelSelection/>
          </div>

          <div className='flex flex-col space-y-2 my-2'>

            {loading && (
              <div className='text-center animate-pulse text-white'>
                <p>Loading Chats...</p>
              </div>
            )}

            {/* Map through the ChatRows */}
            {chats?.docs.map(chat => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

    {/* if session exists, use user's profile pic as image and as signOut button*/}
      {session && (
        <img src={session.user?.image!} alt="Profile Picture" 
        className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-2
        hover:opacity-70' onClick={() => signOut()}/>
      )}

    </div>
  )
}

export default Sidebar;