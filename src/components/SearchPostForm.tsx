'use client'

import { goToSearched } from "@/actions/go-to-search-action"
import { use, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast"
import { FaSearch } from "react-icons/fa";

async function goToSearchedClient(formData: FormData){
    const result = await goToSearched(formData)

    if (result?.error){
        toast.error(result?.error)
    }
}

export default function SearchPostForm(){

    const [isActive, setIsActive] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string | undefined>('');

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // Verificar si el valor del input no es null para activar/desactivar el botón
        setIsActive(inputValue !== null && inputValue !== '');
    }, [inputValue]);

      
    const handleInputChange = () => {
        // Actualizar el estado del valor del input
        setInputValue(ref.current?.value);
    };
    
    return(
        <form action={goToSearchedClient} 
            className="flex justify-between gap-5 w-full">
                <input className="w-full bg-gray-700 p-3 rounded-lg" placeholder="Search" 
                ref={ref} onChange={handleInputChange} name="searchTerm" required></input>
                <button className="py-3 px-10 bg-white text-black rounded-lg text-lg disabled:bg-zinc-500 transition ease-out"
                disabled={!isActive}><FaSearch/></button>
        </form>
    )
}