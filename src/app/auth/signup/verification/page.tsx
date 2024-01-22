import { FC } from 'react'
import sendVerification from '@/actions/send-verification-action'


interface pageProps {
  
}

export default function page({params}:any){
    return (
        <main className='flex flex-col justify-center items-center p-5 h-screen lg:h-auto lg:p-40 text-center'>
            <div className='flex flex-col justify-center gap-10 items-center'>
                <h1 className='text-4xl font-bold'>Write your email.</h1>
                <form className='w-full flex flex-col gap-3' action={sendVerification}>
                    <input type="text" name="email" id="email" className="border rounded-lg text-white text-center text-xl lg:text-4xl font-bold tracking-widest	
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 "/>
                    <button className='p-3 bg-gradient-to-r from-teal-400 to-violet-500 hover:opacity-80 rounded-lg font-bold text-xl'>Send</button>
                </form>
            </div>
        </main>
    )
}
