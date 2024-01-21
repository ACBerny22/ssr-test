'use server'

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getUpdatedPb } from "@/pocketbase"
import { pb } from "@/pocketbase"


export const goToSearched = async (formData:FormData) => {
    'use server'
    await getUpdatedPb(cookies())

    try{
        const records = await pb.collection("posts").getList(1, 20, {
        filter: pb.filter(
            "id ~ {:search} || content ~ {:search} || title ~ {:search} || date ~ {:search} || user ~ {:search}",
            { search: formData.get('searchTerm') }
            )
        })
    }catch(error){
        return{
            error:"Not found"
        }
    }
    
    redirect(`/posts/search?searchTerm=${formData.get("searchTerm")}`)

}