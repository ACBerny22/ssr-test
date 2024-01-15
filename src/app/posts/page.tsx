import { pb } from "@/pocketbase";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import PostCard from "@/components/PostCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { cookies } from "next/headers";
import { getUser } from "@/pocketbase";
import NavBar from "@/components/NavBar";
import { goToSearched } from "@/actions/go-to-search-action";
import SearchPostForm from "@/components/SearchPostForm";

export default async function PostsPage({params, searchParams}: any) {
  
    const currentPage = parseInt(searchParams.page)

    const records = await pb.collection('posts').getList(searchParams.page, 4, {
        sort: '-created',
    });

    const user:any = await getUser(cookies())
    revalidatePath("/posts")

    return (
    <main className="flex flex-col p-10 gap-10">
        <div className="">
            <SearchPostForm></SearchPostForm>
        </div>
        <div className="grid lg:grid-cols-2 gap-5">
            {records.items.map((items) => (<PostCard key={items.id} id={items.id} title={items.title} 
            content={items.content} date={items.date}></PostCard>))}
        </div>
        <div className="flex justify-center gap-5">
            <Link className="flex text-black bg-white py-2 px-3 rounded-lg gap-1"
            href={{pathname:"/posts", query:{page:currentPage-1}}}> <FaArrowLeft/> Anterior</Link>
            <p className="p-2">{records.page} / {records.totalPages}</p>
            <Link className="flex text-black bg-white py-2 px-3 rounded-lg gap-1"
            href={{pathname:"/posts", query:{page:currentPage+1}}}> Siguiente <FaArrowRight /></Link>
        </div>
    </main>
    )
}
