"use server"
import { signIn, signOut } from "next-auth/react";

const SignIn =async () => {
  return (
    <button onClick={()=>{
        signIn()
    }}>
        Login
    </button>
  )
}

export default SignIn



