import { pb } from "@/pocketbase";
import { Post } from "@/interfaces/posts";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import PostCard from "@/components/PostCard";
import { FaFeatherAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { cookies } from 'next/headers'
import { getUser } from "@/pocketbase";



export default async function Home() {
  
 
  const cookieStore = cookies()
  const user:any = await getUser(cookies())


  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-4xl font-black">Welcome to Harmony Posts, {user.name}</h1>
      <Link className="p-4 bg-white text-black rounded-lg"
      href={{pathname: "/posts", query:{page:1}}}>Go to Posts</Link>
 
      {
        cookieStore.getAll().map((cookie) => (
          <div key={cookie.name}>
            <p>Name: {cookie.name}</p>
          </div>))
      }

    </main>
  )
}
