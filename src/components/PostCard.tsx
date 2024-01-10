'use client'

import { FC, useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { isUserValid } from '@/pocketbase';
import { pb } from '@/pocketbase';


interface ComponentProps {
    id:string
    title:string
    content:string
    date:string
}

const PostCard: FC<ComponentProps> = (items : ComponentProps) => {
    const [isDotsOpen, setIsDotsOpen] = useState<boolean>(false)

    const open = () => {
        setIsDotsOpen(!isDotsOpen)
        alert("Im " + isUserValid)
    }

    useEffect(() => {
        console.log(isUserValid)
    },[isDotsOpen])

    return (
    <div className="border p-5 rounded-lg flex flex-col gap-2 bg-zinc-950 border-zinc-800">
        <div className='flex justify-between'>
            <h1 className="text-2xl font-bold">{items.title}</h1>
            <button className='text-lg' onClick={open}>
                <BsThreeDots />
            </button>
        </div>
        <p className="font-light">{items.content}</p>
        <p className="text-sm text-zinc-400 text-right mt-3">{items.date}</p>
    </div>
    )
}

export default PostCard