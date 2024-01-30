'use server'
import { pb, getUpdatedPb } from "@/pocketbase";
import { cookies } from "next/headers";

export async function fetchComments(post_id:string, page:number){
    await getUpdatedPb(cookies())
    
    const data = await pb.collection('comments').getList(page, 20, {
        filter: `post_to = "${post_id}"`,
        expand: 'user'
    });

    console.log(data)
    
    return data
}