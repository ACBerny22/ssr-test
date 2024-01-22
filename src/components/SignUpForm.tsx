'use client'

import { FC } from 'react'
import Link from 'next/link'
import createUser from '@/actions/create-user-action'


interface SignUpFormProps {
  
}

export default function SignUpForm({}){
  
  const callToCreateUser = async (formData:FormData) => {
    const res = await createUser(formData)
  }
  
    return (

    <>
    <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div className="w-full  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                        Create your account
                    </h1>
                    <form action={callToCreateUser} className="space-y-4 md:space-y-6" >
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">Your username</label>
                            <input type="username" name="username" id="username" className="border sm:text-sm rounded-lg text-white
                            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 " placeholder="" required/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">Your name</label>
                            <input type="username" name="name" id="name" className="border sm:text-sm rounded-lg text-white
                            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 " placeholder="" required/>
                        </div>
                        <div>
                            <label  className="block mb-2 text-sm font-medium text-white">Email</label>
                            <input type="email" name="email" id="email"className="border sm:text-sm rounded-lg text-white
                            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 " required/>
                        </div>
                        <div>
                            <label  className="block mb-2 text-sm font-medium text-white">Password</label>
                            <input type="password" name="password" id="password"className="border sm:text-sm rounded-lg text-white
                            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 " required/>
                        </div>
                        <div>
                            <label  className="block mb-2 text-sm font-medium text-white">Confirm Password</label>
                            <input type="password" name="conf-password" id="conf-password"className="border sm:text-sm rounded-lg text-white
                            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 " required/>
                        </div>
                        <button type="submit" className="w-full text-white  focus:ring-4 focus:outline-none focus:ring-primary-300
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-teal-400 to-violet-500 hover:opacity-80">Create Account</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link href="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </>

  )
}
