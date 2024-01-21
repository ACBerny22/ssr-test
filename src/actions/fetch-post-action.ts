'use server'

import { Post } from "@/interfaces/posts";
import { pb, getUpdatedPb } from "@/pocketbase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function fetchPosts(page:number){

    await getUpdatedPb(cookies())
    
    const records = await pb.collection('posts').getList(page, 6, {
        sort: '-created',
        expand:'user'
    });

    revalidatePath("/posts")
    console.log(records.items)
    return records

}

export async function fetchPost(id:string){
    await getUpdatedPb(cookies())

    const record = await pb.collection('posts').getFirstListItem(`id="${id}"`, {
        expand:'user'
    });
    return record

}

 