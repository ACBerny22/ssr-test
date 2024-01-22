'use client'

import { useRef } from 'react'
import createComment from '@/actions/add-comment-action'
import { FaCommentAlt } from "react-icons/fa";


interface CommentFormProps {
    post_to:string
    user?:any
}

export default function CommentForm({post_to, user}:CommentFormProps){

    //const createCommentWithId = createComment.bind(null, post_to)
    const ref = useRef<HTMLFormElement>(null)

    const callToCreateComment = async (formData: FormData) => {
        const result = await createComment(post_to, formData) 
        ref.current?.reset()
    }

    return (
    <>
        <form ref={ref} action={callToCreateComment} className='flex flex-col gap-3'>
            <div className='flex gap-5'>
                <div className='relative w-14 h-14 overflow-hidden rounded-full'>
                    <img className='object-cover w-full h-full rounded-full' src={`${process.env.NEXT_PUBLIC_DB_POCKET}/api/files/_pb_users_auth_/${user.id}/${user.avatar}`} 
                    />
                </div>
                <input className='w-full bg-transparent px-5 border-b'  name="content" placeholder='Add a comment...' required></input>
            </div>
            <div className='flex items-end justify-end'>
                <button className='p-3 bg-white text-gray-800 rounded-xl flex gap-3 font-bold transition-all ease-out hover:bg-gray-300'>
                    <div className='text-xl mt-1'>
                        <FaCommentAlt/>
                    </div>
                    Publish
                </button>
            </div>
        </form>
    </>
    )
}
