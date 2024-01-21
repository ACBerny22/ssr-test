"use server"
import { pb } from "@/pocketbase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const logIn = async (formData:FormData) => {
    'use server'

    try{
        const authData = await pb.collection('users').authWithPassword(
            formData.get("username") as string,
            formData.get("password") as string,
        )
        
        console.log(pb.authStore.model)

    }catch(error){
        return{
            error:"Bad Credentials"
        }
    }

    cookies().set('pb_auth', pb.authStore.exportToCookie({httpOnly:true}))

    const cookie_object = cookies().get('pb_auth');
    const cookie_string = cookie_object?.name + '=' + cookie_object?.value;

    //pb.authStore.loadFromCookie(cookie_string)

    redirect("/")
}