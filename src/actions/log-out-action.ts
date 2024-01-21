'use server'

import { pb, getUpdatedPb } from "@/pocketbase"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function logout(formData:FormData) {

    pb.authStore.clear();
    cookies().delete('pb_auth')

    revalidatePath("/posts")
    redirect("/")
}