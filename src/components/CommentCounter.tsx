import { FC } from "react";
import { pb, getUser } from "@/pocketbase";
import { TfiComments } from "react-icons/tfi";

interface CommentCounterProps {}

export default async function CommentCounter() {
    return (
        <>
            <div className="flex gap-3 bg-gray-600  px-2 rounded-full group-hover:bg-gray-200">
                <button className="text-lg mt-1 hover:text-red-600">
                    <TfiComments></TfiComments>
                </button>
                <p className="text-lg">{0}</p>
            </div>
        </>
    );
}
