import { pb } from "@/pocketbase";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import PostCard from "@/components/PostCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {fetchPosts} from "@/actions/fetch-post-action";
import SearchPostForm from "@/components/SearchPostForm";
import { Post } from "@/interfaces/posts";
import CommentCounter from "@/components/CommentCounter";

export default async function PostsPage({params, searchParams}: any) {
  

    const currentPage = parseInt(searchParams.page)
    const records = await fetchPosts(currentPage)
    
    console.log(records.items)

    //const user:any = await getUser(cookies())

    return (
    <main className="flex flex-col py-10 px-5 sm:px-40 gap-10 xl:px-60">
        <div className="">
            <SearchPostForm></SearchPostForm>
        </div>
        <h1 className="text-3xl font-bold">Posts</h1>
        <section className="grid lg:grid-cols-2 gap-5">
            {records.items.map((item) => (
            <PostCard key={item.id} id={item.id} title={item.title} 
            content={item.content} date={item.date} likes={item.likes} user={item.expand?.user} comments={item.expand?.['comments(post_to)']}/>))}
        </section>
        <div className="flex justify-center gap-5">
            <Link className="flex text-black bg-white py-2 px-3 rounded-lg gap-1"
            href={{pathname:"/posts", query:{page:currentPage-1}}}>
                <span className="mt-1"><FaArrowLeft/></span>Prev.
            </Link>
            <p className="p-2">{records.page} / {records.totalPages}</p>
            <Link className="flex text-black bg-white py-2 px-3 rounded-lg gap-1"
            href={{pathname:"/posts", query:{page:currentPage+1}}}> 
                Next <span className="mt-1"><FaArrowRight/></span>
            </Link>
        </div>
    </main>
    )
}
