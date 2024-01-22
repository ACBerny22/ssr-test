'use server'

import { pb, getUpdatedPb } from "@/pocketbase";
import { cookies } from "next/headers";


export default async function fetchCurrentUser(id:string) {
    
    await getUpdatedPb(cookies())
    console.log(id)
    const record = await pb.collection('users').getFirstListItem(`id="${id}"`);
    return record
}