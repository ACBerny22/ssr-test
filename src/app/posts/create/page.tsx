import { FC } from 'react'
import { redirect } from 'next/navigation'
import { pb } from '@/pocketbase'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { getUser } from '@/pocketbase'

interface ComponentProps {
  
}

const Component: FC<ComponentProps> = async ({}) => {

    // Obtenenemos el user actual para pasarlo al nuevo post.👌
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
        <section className="bg-gray-900">
            <div className="flex flex-col items-center justify-center px-5 lg:px-20 py-8 h-full lg:py-10">
                <div className="w-full rounded-lg shadow border md:mt-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                            Create a new Post
                        </h1>
                        <form className="space-y-4 md:space-y-6" action={addPost}>
                            <div>
                                <label className="block mb-2 text-sm lg:text-lg font-medium  text-white">Title</label>
                                <input type="username" name="title" id="username" className=" border  text-sm lg:text-lg rounded-lg font-light
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 
                                text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Sassy title..." required/>
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm lg:text-lg font-medium  text-white">Post</label>
                                <textarea name="content" rows={12} cols={100} id="content" placeholder='What are you thinking?...' className=" border font-light text-sm lg:text-lg rounded-lg 
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 
                                text-white focus:ring-blue-500 focus:border-blue-500" required/>
                            </div>
                            <div className='flex justify-end gap-5'>
                                <button type="submit" className="  font-bold rounded-lg text-lg p-3">Cancel</button>
                                <button type="submit" className=" text-gray-800 font-bold rounded-lg text-lg bg-white p-3">Publish</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        )
}

export default Component