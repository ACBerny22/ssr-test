'use server'


import { pb  } from "@/pocketbase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function sendVerification(formData:FormData) {

    console.log(formData.get("email"))

}