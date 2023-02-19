'use client';
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#12a47f] h-screen flex flex-col items-center 
    justify-center text-center">
        {/* since the image tag does a lot of optimization and we are using a  */}
        {/* custom domain we need to add the domain 'links.papareact.com' */}
        {/* in next.config.js file */}
        <Image
            // src="https://links.papareact.com/216"
            src="https://brandlogovector.com/wp-content/uploads/2023/01/ChatGPT-Icon-Logo-PNG.png"
            width={300} height={300}
            alt="Logo"
        />
        {/* use animate in classname for animating effect */}
        <button className="text-white font-semibold text-xl" 
        onClick={() => signIn("google")}>
            Sign In to use ChatGPT
        </button>
    </div>
  )
}

export default Login