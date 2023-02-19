//All requests to /api/auth/* (signIn, callback, signOut, etc.) 
//will automatically be handled by NextAuth.js.

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
//   ! means that the GOOGLE_ID and GOOGLE_SECRET will be there
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)