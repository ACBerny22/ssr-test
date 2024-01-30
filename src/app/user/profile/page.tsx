"use client";

import { FC } from "react";
import fetchCurrentUser from "@/actions/fetch-user-action";
import { getUser } from "@/pocketbase";
import { useCookies } from "react-cookie";
import { BsPersonFillAdd } from "react-icons/bs";
import { sendFreindRequest } from "@/actions/friend-controller-action";
import { useState, useEffect } from "react";
import { pb } from "@/pocketbase";
import { MdModeEditOutline } from "react-icons/md";

interface pageProps {}

export default function page() {
    const [user, setUser] = useState<any>();
    const [cookies, setCookie] = useCookies(["pb_auth"]);

    const [editName, setEditName] = useState<boolean>(false);

    // Obtener el usuario del lado del cliente.
    useEffect(() => {
        pb.authStore.loadFromCookie(cookies.pb_auth || "");
        if (pb.authStore) {
            setUser(pb.authStore.model);
        }
    }, []);

    return (
        <>
            {user && (
                <div className="flex flex-col py-10 px-5 sm:px-40 gap-10 xl:px-60">
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="relative w-28 h-28 lg:w-48 lg:h-48 overflow-hidden rounded-full">
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src={`${process.env.NEXT_PUBLIC_DB_POCKET}/api/files/_pb_users_auth_/${user?.id}/${user?.avatar}`}
                                alt={`${user?.username}`}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-5">
                                {editName ? (
                                    <input
                                        className=" border  text-sm lg:text-lg rounded-lg font-light
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 
                                text-white focus:ring-blue-500 focus:border-blue-500"
                                    ></input>
                                ) : (
                                    <h1 className="text-5xl ">{user?.name}</h1>
                                )}
                                <div
                                    className="text-3xl"
                                    onClick={() => setEditName(!editName)}
                                >
                                    <MdModeEditOutline />
                                </div>
                            </div>

                            <p className="text-xl font-light">
                                @{user?.username}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
