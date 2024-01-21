import NavBar from "@/components/NavBar"
import PostCard from "@/components/PostCard"
import { pb } from "@/pocketbase"
import { redirect } from "next/navigation"

export default async function SearchPostPage({params, searchParams}: any){

    const records:any = await pb.collection("posts").getList(1, 20, {
        filter: pb.filter(
            "id ~ {:search} || content ~ {:search} || title ~ {:search} || date ~ {:search} || user ~ {:search}",
            { search: searchParams.searchTerm}
            ),
        expand:'user'
        })

    console.log(records.items)
    
    return(
        <div className="flex flex-col p-10 gap-10">
            <p className="text-2xl font-light">Search: <span className="font-bold">"{searchParams.searchTerm}"</span></p>
            {records.items.map((item:any) => (
                <PostCard id={item.id} content={item.content} title={item.title} date={item.date} likes={item.likes} user={item.expand.user}/>
            ))}
            {records.items.length  === 0 && 
            <p className="flex justify-center items-center text-3xl font-bold h-48">
                Sorry, no results found.
            </p>
            }
        </div>
    )
}