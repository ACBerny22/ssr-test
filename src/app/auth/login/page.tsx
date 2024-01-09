import { FC } from 'react'
import { useFormState } from 'react-dom'
import { pb } from '@/pocketbase'

const initialState = {
    message: null
}

const LoginPage = ({}) => {

    const logIn = async (formData:FormData) => {
        'use server'

        const authData = await pb.collection('users').authWithPassword(
            formData.get("username") as string,
            formData.get("password") as string,
        );
    }

    return (
    <div className='flex flex-col gap-5 items-center justify-center h-screen'> 
        <h1 className='text-2xl font-semibold'>Login</h1>
        <div>
            <form action={logIn}
            className='flex flex-col border p-12 rounded-xl gap-7 border-zinc-700 bg-zinc-950'>
                <input className='bg-zinc-800 p-4 rounded-lg' placeholder='Username' name="username" required></input>
                <input className='bg-zinc-800 p-4 rounded-lg' placeholder='Password' name="password" type='password' required></input>
                <button className='bg-white text-black p-3 rounded-lg text-lg border border-white
                hover:bg-transparent hover:text-white transition-all ease-out'>
                    Log In
                </button>
            </form>
        </div>
    </div>)
}

export default LoginPage