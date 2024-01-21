'use server'
import { pb, getUpdatedPb, getUser } from "@/pocketbase"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export default async function createComment(post_to:string, formData:FormData) {
    await getUpdatedPb(cookies())
    const user = await getUser(cookies())

    if(user){

        const data = {
            "content": formData.get('content'),
            "user": user.id,
            "post_to": post_to,
            "likes": 0
        };

        const record = await pb.collection('comments').create(data);
        revalidatePath(`posts/${post_to}`)
    }
}