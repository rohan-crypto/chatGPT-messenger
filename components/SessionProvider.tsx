// to state that session provider is a client side component, this line is used
'use client' 

import {Session} from "next-auth";
import {SessionProvider as Provider} from "next-auth/react";

type Props = {
    children: React.ReactNode;
    session: Session | null;
}

// so in this function, we are expecting children which will be child react nodes
// and a session from next auth
// in layout.tsx, everything wrapped inside SessionsProvider is its children
export function SessionProvider({children, session}: Props) {
    return (
        <Provider>
            {children}
        </Provider>
    )
}