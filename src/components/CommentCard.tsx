import { fetchComments } from '@/actions/fetch-comments-action'
import { User } from '@/interfaces/user'
import { FC } from 'react'

interface CommentCardProps {
    content:string
    user:User
    post_user:User
    
}

export default async function CommentCard({...props} : CommentCardProps){
    
    return (
        <>
            <div className='flex items-center gap-4'>
                <div className='relative w-12 h-12 overflow-hidden rounded-full'>
                    <img className='object-cover w-full h-full rounded-full' src={`${process.env.NEXT_PUBLIC_DB_POCKET}/api/files/_pb_users_auth_/${props.user.id}/${props.user.avatar}`} 
                    />
                </div>
                <div className='flex justify-between flex-col py-5 gap-1'>
                    <p className='font-bold'>{props.user.username} {(props.user.username === props.post_user.username) &&
                     <span className='text-xs px-3 py-1 bg-white rounded-full text-gray-800'>Creator</span>}
                     </p>
                    <p className='font-light'>{props.content}</p>
                </div>
            </div>
        </>
    )
}
