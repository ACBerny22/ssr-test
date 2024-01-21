'use client'

import { FC } from 'react'
import { IoIosCreate } from "react-icons/io";
import { FaFeatherAlt } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NewPostButtonProps {
  
}



export default function NewPostButton({}){
    const pathname = usePathname()
    console.log(pathname)

    return (
        <div className={`p-5 text-4xl rounded-full bg-gradient-to-r from-teal-400 to-violet-500 hover:brightness-50 transition ease-out
        fixed bottom-5 right-5 flex justify-center items-center 
        ${(pathname.startsWith("/auth") || pathname.startsWith("/posts/create")) ? 'hidden': ''}`}>
            <Link href={"/posts/create"}>
                <FaFeatherAlt></FaFeatherAlt>
            </Link>
        </div>
    )
}
