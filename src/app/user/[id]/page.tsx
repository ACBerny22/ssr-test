import { FC } from 'react'
import { cookies } from 'next/headers'
import fetchCurrentUser from '@/actions/fetch-user-action'
import { BsPersonFillAdd } from 'react-icons/bs'
import { sendFreindRequest } from '@/actions/friend-controller-action'

interface pageProps {
  params:{
    id:string
  }
}

export default async function page({params} : pageProps){

    const user:any = await fetchCurrentUser(params.id)
    console.log(user)

    const sendFreindRequestWithId = sendFreindRequest.bind(null, params.id as any)

    return (
        <div className='flex flex-col py-10 px-5 sm:px-40 gap-10 xl:px-60'>
            <div className='flex flex-col lg:flex-row gap-10'>
                <div className='relative w-28 h-28 lg:w-48 lg:h-48 overflow-hidden rounded-full'>
                    <img className='object-cover w-full h-full rounded-full' src={`${process.env.NEXT_PUBLIC_DB_POCKET}/api/files/_pb_users_auth_/${user?.id}/${user?.avatar}`} 
                    alt={`${user?.username}`} />
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-5xl '>{user.name}</h1>
                    <p className='text-xl font-light'>@{user.username}</p>
                    <form className='w-full' action={sendFreindRequestWithId}>
                        <button className='flex w-full items-center justify-center gap-2 bg-white p-3 text-lg text-gray-900 
                        rounded-lg mt-10 hover:brightness-75 transition-all ease-out'>
                            <div className='text-2xl'><BsPersonFillAdd></BsPersonFillAdd></div>
                            Add friend
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
