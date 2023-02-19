import ClientProvider from 'components/ClientProvider';
import Login from 'components/Login';
import { SessionProvider } from 'components/SessionProvider';
import Sidebar from 'components/Sidebar';
import {getServerSession} from "next-auth";
import { authOptions } from 'pages/api/auth/[...nextauth]';
import '../styles/globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <html>
      <head />
      <body>
        {/* everything wrapped inside SessionsProvider is its children */}
        {/* so now all the children have the ability to share session state */}
        <SessionProvider session={session}>
          {/* if session does not exist, redirect to login page else
          show home page*/}
          {!session ? (
            <Login/>
          ) : (
          <div className='flex'>
            {/* tailwind is mobile first (in case of responsive content) */}
            {/* so here, for small devices max-w-xs then from md devices (768px) */}
            {/* min-w-20rem */}
            <div className='bg-[#202123] max-w-xs h-screen overflow-y-hidden
            md:min-w-[20rem]'>
              <Sidebar/>
            </div>

            {/* ClientProvider - Notification */}
            {/* we can use this pattern to push anything that needs the  */}
            {/* client at the top level, we can inject it at this level */} 
            <ClientProvider/>

            <div className='bg-[#343541] flex-1'>{children}</div>
          </div>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
