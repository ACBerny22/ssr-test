'use server'

import { pb  } from "@/pocketbase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function createUser(formData:FormData) {
    
    const data = {
        "username": formData.get("username"),
        "email": formData.get("email"),
        "emailVisibility": true,
        "password": formData.get("password"),
        "passwordConfirm": formData.get("conf-password"),
        "name": formData.get("name")
    };
    
    console.log(data)
    
    if(data){
            console.log(typeof(data.email))
            const record = await pb.collection('users').create(data);
            console.log(record)
            await pb.collection('users').requestVerification(data.email as string);
    }
}