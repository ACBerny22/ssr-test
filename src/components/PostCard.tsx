"use client";
import React from "react";
import { FC, useEffect, useState } from "react";
import { BsHeart, BsThreeDots } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { User } from "@/interfaces/user";
import { TfiComments } from "react-icons/tfi";
import { pb } from "@/pocketbase";
import { useCookies } from "react-cookie";

interface ComponentProps {
    id: string;
    title: string;
    content: string;
    date: string;
    user?: User;
    currentUser: any; // Porque esta madre ni ni ni jala 🙃
    comments?: any;
    likes?: any;
}

const PostCard: FC<ComponentProps> = (items: ComponentProps) => {
    const [isDotsOpen, setIsDotsOpen] = useState<boolean>(false);
    const [data, setData] = useState();

    useEffect(() => {}, []);

    return (
        <div
            className=" p-5 rounded-lg flex flex-col gap-2 bg-gray-800 border border-gray-800 hover:border-gray-500
            transition-all ease-out group"
        >
            <div className="mb-5">
                <div className="mb-5 flex gap-3 justify-between">
                    <Link
                        href={
                            items.user?.id !== items.currentUser?.id
                                ? `/user/${items.user?.id}`
                                : `/user/profile`
                        }
                        className="flex gap-3 justify-center items-center"
                    >
                        <div className="relative w-10 h-10 overflow-hidden rounded-full">
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src={`${process.env.NEXT_PUBLIC_DB_POCKET}/api/files/_pb_users_auth_/${items.user?.id}/${items.user?.avatar}`}
                                alt={`${items.user?.username}`}
                            />
                        </div>
                        <p className="hover:underline transition-all ease-out">
                            {items.user?.name}:
                        </p>
                    </Link>
                    <button className="text-lg">
                        <BsThreeDots />
                    </button>
                </div>
                <Link
                    href={`/posts/${items.id}`}
                    className="flex flex-col gap-2"
                >
                    <h1 className="text-2xl font-bold">{items.title}</h1>
                    <p className="font-light">{items.content}</p>
                </Link>
            </div>
            <hr className="order-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
            <div className="flex justify-between">
                <div className="flex gap-2 text-gray-800 mt-3">
                    <div className="flex gap-10">
                        <div className="flex gap-3 bg-gray-600  px-2 rounded-full group-hover:bg-gray-200">
                            <button className="text-lg mt-1 hover:text-red-600">
                                <BsHeart></BsHeart>
                            </button>
                            {items.likes?.length ? (
                                <p className="text-lg">{items.likes?.length}</p>
                            ) : (
                                <p className="text-lg">0</p>
                            )}
                        </div>
                        <div className="flex gap-3 bg-gray-600  px-2 rounded-full group-hover:bg-gray-200">
                            <button className="text-lg mt-1 hover:text-red-600">
                                <TfiComments></TfiComments>
                            </button>
                            {items.comments?.length ? (
                                <p className="text-lg">
                                    {items.comments?.length}
                                </p>
                            ) : (
                                <p className="text-lg">0</p>
                            )}
                        </div>
                    </div>
                </div>
                <p className="text-sm text-zinc-400 mt-3">
                    {items.date.slice(0, 10)}
                </p>
            </div>
        </div>
    );
};

export default PostCard;
