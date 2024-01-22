'use client'

import { logIn } from "@/actions/log-in-action"
import toast from "react-hot-toast"
import Link from "next/link"

async function callToLogin(formData: FormData){
    // Se manda a llamar el server action desde el Client-Component.
    const result = await logIn(formData)
    if (result.error){
        toast.error(result.error)
    }
}

export default function LogInForm(){
    return(
        <>
        <section className="bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action={callToLogin}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">Your username</label>
                                <input type="username" name="username" id="username" className="border sm:text-sm rounded-lg text-white
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 " placeholder="" required/>
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" name="password" id="password"className="border sm:text-sm rounded-lg text-white
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 " required/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white  focus:ring-4 focus:outline-none focus:ring-primary-300
                             font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-teal-400 to-violet-500 hover:opacity-80">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link href="/auth/signup" className="font-medium text-primary-600 hover:underline dark:text-primary">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>

    )
}