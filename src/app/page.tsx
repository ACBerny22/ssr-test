import { pb } from "@/pocketbase";
import { Post } from "@/interfaces/posts";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import PostCard from "@/components/PostCard";
import { FaFeatherAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { cookies } from 'next/headers'
import { getUser, isAuthenticated } from "@/pocketbase";

export default async function Home() {
  
  const cookieStore = cookies()
  const user:any = await getUser(cookies())

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-4xl font-black">Welcome to Harmony Posts.</h1> 
      <h1 className="text-2xl font-light">{user?.name}</h1>
      <Link className="p-4 bg-white text-black rounded-lg"
      href={{pathname: "/posts", query:{page:1}}}>Explore</Link>
    </main>
  )
}
