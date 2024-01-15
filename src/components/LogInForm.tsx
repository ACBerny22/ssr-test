'use client'

import { logIn } from "@/actions/log-in-action"
import toast from "react-hot-toast"

async function callToLogin(formData: FormData){
    const result = await logIn(formData)
    if (result.error){
        toast.error(result.error)
    }
}

export default function LogInForm(){
    return(
        <form action={callToLogin}
            className='flex flex-col gap-10'>
                <input className='bg-zinc-800 p-4 rounded-lg' placeholder='Username' name="username" required></input>
                <input className='bg-zinc-800 p-4 rounded-lg' placeholder='Password' name="password" type='password' required></input>
                <button className='bg-white text-black p-3 rounded-lg text-lg border border-white
                hover:bg-transparent hover:text-white transition-all ease-out'>
                    Log In
                </button>
        </form>
    )
}