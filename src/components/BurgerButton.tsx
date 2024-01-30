"use client";

import { FC, use } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

interface BurgerButtonProps {
    user: any;
}

export default function BurgerButton({ user }: BurgerButtonProps) {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsActive(!isActive)}
                className="lg:hidden text-3xl flex items-center border p-2 rounded-lg z-50 bg-white/30 hover:bg-white/20"
            >
                <RxHamburgerMenu />
            </button>
            {isActive && (
                <div
                    className="fixed top-0 right-0 h-screen w-screen bg-gray-900 p-20 animated-div z-40 overflow-y-auto"
                    aria-labelledby="dropdownDefaultButton"
                >
                    <div className="flex justify-center items-center bg-gray-800 w-full text-white p-5">
                        <ul className="flex justify-center items-center flex-col gap-5">
                            <li className="text-3xl font-light">{user.name}</li>
                            <li className="p-3 bg-red-400 rounded-xl">
                                <button>Log Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
