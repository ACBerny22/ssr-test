import { pb } from "@/pocketbase";
import { Post } from "@/interfaces/posts";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import PostCard from "@/components/PostCard";
import { FaFeatherAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";

export default async function Home() {
  
  const records = await pb.collection('posts').getList(1, 4, {
    sort: '-created',
  });

  revalidatePath("/")

  return (
    <main className="flex flex-col p-10 gap-10">
      <div className="flex justify-between">
        <h1 className="text-4xl font-black">Harmony Posts</h1>
        <div className="flex gap-3">
          <Link href={"/post/create"} className="flex gap-3 p-3 bg-white text-black rounded-lg border border-white
          hover:bg-transparent hover:text-white transition-all ease-out">
            <div className="mt-1 text-lg">
              <FaFeatherAlt></FaFeatherAlt>
            </div>
            New Post
          </Link>
          <Link href={"/auth/login"} className="flex gap-3 p-3  border border-white rounded-lg bg-transparent text-white
          hover:bg-zinc-600 hover:border-zinc-900 transition-all ease-out">
            <div className="text-2xl">
              <CiLogin />
            </div>
            Log In
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {records.items.map((items) => (<PostCard key={items.id} id={items.id} title={items.title} 
        content={items.content} date={items.date}></PostCard>))}
      </div>
      <div className="flex justify-center gap-5">
        <button>Anterior</button>
        {records.page} / {records.totalPages}
        <button>Siguiente</button>
      </div>
    </main>
  )
}
