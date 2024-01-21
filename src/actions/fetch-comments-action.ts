'use server'
import { pb, getUpdatedPb } from "@/pocketbase";
import { cookies } from "next/headers";

export async function fetchComments(post_id:string) {
    await getUpdatedPb(cookies())
    
    const data = await pb.collection('comments').getList(1, 20, {
        filter: `post_to = "${post_id}"`,
        expand: 'user'
    });

    console.log(data)
    
    return data
}