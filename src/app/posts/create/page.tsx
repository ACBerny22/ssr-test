import { FC } from 'react'
import { redirect } from 'next/navigation'
import { pb } from '@/pocketbase'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { getUser } from '@/pocketbase'

interface ComponentProps {
  
}

const Component: FC<ComponentProps> = async ({}) => {

    const user:any = await getUser(cookies())

    const addPost = async (formData:FormData) => {
        'use server'

        const data = {
            "content": formData.get("content"),
            "title": formData.get("title"),
            "date": "2022-01-01 10:00:00.123Z",
            "user": user.id as string
        };
        
        const record = await pb.collection('posts').create(data);

        redirect("/posts?page=1")
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-10">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create a new Post
                        </h1>
                        <form className="space-y-4 md:space-y-6" action={addPost}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="username" name="title" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required/>
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <textarea name="content" rows={18} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            </div>
                            <button type="submit" className="w-full text-gray-800 font-bold rounded-lg text-lg bg-white p-3">Publish</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        )
}

export default Component