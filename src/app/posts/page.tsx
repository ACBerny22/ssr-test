import { pb } from "@/pocketbase";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import PostCard from "@/components/PostCard";
import { FaFeatherAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { cookies } from "next/headers";
import { getUser } from "@/pocketbase";

export default async function PostsPage({params, searchParams}: any) {
  
    const currentPage = parseInt(searchParams.page)

    const records = await pb.collection('posts').getList(searchParams.page, 4, {
        sort: '-created',
    });

    const user:any = await getUser(cookies())
    console.log(user)

    revalidatePath("/posts")

    return (
    <main className="flex flex-col p-10 gap-10">
        <div className="flex justify-between">
            <Link href={"/"} className="text-4xl font-black">Harmony Posts</Link>
            <div className="flex gap-3">
                <Link href={"/posts/create"} className="flex gap-3 p-3 bg-white text-black rounded-lg border
                 border-white hover:bg-transparent hover:text-white transition-all ease-out">
                <div className="mt-1 text-lg">
                    <FaFeatherAlt></FaFeatherAlt>
                </div>
                New Post
                </Link>
                {!cookies().get('pb_auth') ?
                <Link href={"/auth/login"} className="flex gap-3 p-3  border border-white rounded-lg
                 bg-transparent text-white
                hover:bg-zinc-600 hover:border-zinc-900 transition-all ease-out">
                    <div className="text-2xl">
                        <CiLogin />
                    </div>
                    Log In
                </Link>
                : <p>{user?.username}</p>
                }
            </div>
        </div>
        {cookies().get('pb_auth') &&
        <div className="flex flex-col gap-5">
            {records.items.map((items) => (<PostCard key={items.id} id={items.id} title={items.title} 
            content={items.content} date={items.date}></PostCard>))}
        </div>
        }
        <div className="flex justify-center gap-5">
            <Link className="flex text-black bg-white py-2 px-3 rounded-lg gap-1"
            href={{pathname:"/posts", query:{page:currentPage-1}}}> <FaArrowLeft/> Anterior</Link>
            <p className="p-2">{records.page} / {records.totalPages}</p>
            <Link className="flex text-black bg-white py-2 px-3 rounded-lg gap-1"
            href={{pathname:"/posts", query:{page:currentPage+1}}}> Siguiente <FaArrowRight /></Link>
        </div>
        
        <p>{}</p>
        
    </main>
    )
}
