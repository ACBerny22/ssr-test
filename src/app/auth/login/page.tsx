import { FC } from 'react'
import { useFormState } from 'react-dom'
import { pb } from '@/pocketbase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const initialState = {
    message: null
}

const LoginPage = async ({}) => {

    const logIn = async (formData:FormData) => {
        'use server'

        const authData = await pb.collection('users').authWithPassword(
            formData.get("username") as string,
            formData.get("password") as string,
        );

        console.log(authData)

        cookies().set('pb_auth', pb.authStore.exportToCookie({httpOnly:true}))

        const cookie_object = cookies().get('pb_auth');
        const cookie_string = cookie_object?.name + '=' + cookie_object?.value;

        pb.authStore.loadFromCookie(cookie_string)

        redirect("/")
    }

    return (
    <div className='flex flex-col gap-5 items-center justify-center h-screen'> 
        <h1 className='text-2xl font-semibold'>Login</h1>
        <div className='flex flex-col items-center border p-12 rounded-xl gap-7 border-zinc-700 bg-zinc-950'>
            <form action={logIn}
            className='flex flex-col gap-10'>
                <input className='bg-zinc-800 p-4 rounded-lg' placeholder='Username' name="username" required></input>
                <input className='bg-zinc-800 p-4 rounded-lg' placeholder='Password' name="password" type='password' required></input>
                <button className='bg-white text-black p-3 rounded-lg text-lg border border-white
                hover:bg-transparent hover:text-white transition-all ease-out'>
                    Log In
                </button>
            </form>
            <p className='text-zinc-400'>Not registered? <span>Sign In</span></p>
        </div>
    </div>)
}

export default LoginPage