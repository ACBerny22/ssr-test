import NavBar from "@/components/NavBar"
import PostCard from "@/components/PostCard"
import { pb } from "@/pocketbase"
import { redirect } from "next/navigation"

export default async function SearchPostPage({params, searchParams}: any){

    const records = await pb.collection('posts').getFirstListItem(`title~"${searchParams.searchTerm}"`)
    
    return(
        <div className="flex flex-col p-10 gap-10">
            <PostCard id={records.id} content={records.content} title={records.title} date={records.date}></PostCard>
        </div>
    )
}