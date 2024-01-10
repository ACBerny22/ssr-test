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
        <div className='flex flex-col gap-5 items-center justify-center h-screen'> 
            <h1 className='text-2xl font-semibold'>Create New Post</h1>
            <div>
                <form action={addPost}
                className='flex flex-col border p-12 rounded-xl gap-7 border-zinc-700 bg-zinc-950'>
                    <input className='bg-zinc-800 p-4 rounded-lg' placeholder='Title' name="title" required></input>
                    <textarea className='bg-zinc-800 p-4 rounded-lg' placeholder='Whats in your mind' name="content" required rows={8} ></textarea>
                    <button className='bg-white text-black p-3 rounded-lg text-lg border border-white
                    hover:bg-transparent hover:text-white transition-all ease-out'>
                        Publish
                    </button>
                </form>
            </div>
        </div>)
}

export default Component