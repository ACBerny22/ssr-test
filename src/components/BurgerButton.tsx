'use client'

import { FC, use } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useState } from 'react'

interface BurgerButtonProps {
  user:any
}

export default function BurgerButton({user}: BurgerButtonProps){
 
    const [isActive, setIsActive] = useState(false)
 
    return (
    <>
        <button onClick={() => setIsActive(!isActive)} className="lg:hidden text-3xl flex items-center border p-2 rounded-lg bg-white/30 hover:bg-white/20">
            <RxHamburgerMenu />
        </button>
        {isActive &&
        <div className="absolute top-20 right-10" aria-labelledby="dropdownDefaultButton">
            <div className='bg-white text-gray-800 p-5'>
                <ul className='flex flex-col items-center justify-center'>
                    <li className='border'>{user.name}</li>
                    <li>Log Out</li>
                </ul>   
            </div>
        </div>
        }
    </>
  )
}
