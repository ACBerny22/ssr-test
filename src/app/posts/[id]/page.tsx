import { FC } from 'react'
import { pb } from '@/pocketbase'
import PostCard from '@/components/PostCard'
import NavBar from '@/components/NavBar'

interface pageProps {
    params:{
        id:string
    }
}

export default async function Page({params} : pageProps){

    const record = await pb.collection('posts').getFirstListItem(`id="${params.id}"`);


    return (
    <div className='flex flex-col gap-10 p-10'>
        <PostCard id={record.id} title={record.title} content={record.content} date={record.date}  />
    </div>
    )
}

