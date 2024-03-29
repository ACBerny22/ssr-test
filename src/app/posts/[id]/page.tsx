
import PostCard from '@/components/PostCard'
import { fetchPost } from '@/actions/fetch-post-action'
import CommentCard from '@/components/CommentCard'
import { fetchComments } from '@/actions/fetch-comments-action'
import createComment from '@/actions/add-comment-action'
import CommentForm from '@/components/CommentForm'
import { getUser } from '@/pocketbase'
import { cookies } from 'next/headers'
import fetchCurrentUser from "@/actions/fetch-user-action";
import { revalidatePath, revalidateTag } from 'next/cache'


interface pageProps {
    params:{
        id:string
    }
}

export default async function Page({params} : pageProps){

    const record = await fetchPost(params.id)
    const comments = await fetchComments(params.id, 1)
    const user:any = await getUser(cookies())

    let currentUser
    if(user){
        currentUser = await fetchCurrentUser(user?.id as string)
    }


    revalidatePath(`/posts/[id]`, 'page')

    return (
    <>
    <main className='flex flex-col gap-10 py-10 px-5 sm:px-40 xl:px-60'>
        <div>
            <PostCard id={record.id} title={record.title} content={record.content} date={record.date} likes={record.likes} user={record.expand?.user} currentUser={currentUser} />
        </div>
        <section>
            <div className='flex justify-between mb-10 text-2xl font-bold'>
                <h1>Comments:</h1>
                <p className='text-lg'>({comments.totalItems}):</p>
            </div>
            <div>
                <CommentForm post_to={params.id} user={currentUser}></CommentForm>
            </div>
            {comments.items.map((comment) => (
                <CommentCard content={comment.content} user={comment.expand?.user} post_user={record.expand?.user}/>
            ))}
        </section>
    </main>
    </>
    )
}

