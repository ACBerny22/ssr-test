'use client'

import { goToSearched } from "@/actions/go-to-search-action"
import toast from "react-hot-toast"

async function goToSearchedClient(formData: FormData){
    const result = await goToSearched(formData)

    if (result?.error){
        toast.error(result?.error)
    }
}

export default function SearchPostForm(){
    return(
        <form action={goToSearchedClient} 
            className="flex justify-between gap-5">
                <input className="w-full bg-zinc-950 p-3 rounded-lg" placeholder="Search" name="searchTerm" required></input>
                <button className="py-3 px-5 bg-white text-black rounded-lg">Search</button>
        </form>
    )
}