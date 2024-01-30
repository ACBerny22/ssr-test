'use server'

import { pb, getUpdatedPb, getUser } from "@/pocketbase";
import { cookies } from "next/headers";


export async function sendFreindRequest(fromData:FormData){
    await getUpdatedPb(cookies())
    const currentUser = await getUser(cookies());
    if(currentUser){
        const data = {"user":currentUser.id, "friend":fromData, "status":"requested"}
        console.log(data);
    }
    //const record = await pb.collection('user_friend').create(data);

}