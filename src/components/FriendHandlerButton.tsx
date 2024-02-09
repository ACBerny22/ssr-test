import { BsPersonFillAdd } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { MdCancelScheduleSend } from "react-icons/md";

interface FriendHandlerButtonProps {
    friendAction: any;
    status: string;
}

export default function FriendHandlerButton({
    ...props
}: FriendHandlerButtonProps) {
    return (
        <form action={props.friendAction}>
            {props.status === undefined && (
                <button
                    className="flex w-full items-center justify-center gap-2 bg-white p-3 text-lg text-gray-900 
                        rounded-lg mt-10 hover:brightness-75 transition-all ease-out"
                >
                    <div className="text-2xl">
                        <BsPersonFillAdd></BsPersonFillAdd>
                    </div>
                    Add friend
                </button>
            )}
            {props.status === "requested" && (
                <button
                    className="flex w-full items-center justify-center gap-2 bg-gray-900 p-3 text-lg text-gray-500 
                        rounded-lg mt-10 hover:brightness-75 transition-all ease-out"
                >
                    <div className="text-2xl">
                        <MdCancelScheduleSend></MdCancelScheduleSend>
                    </div>
                    Cancel Request
                </button>
            )}
            {props.status === "accepted" && (
                <button
                    className="flex w-full items-center justify-center gap-2 bg-white p-3 text-lg text-gray-800 
                        rounded-lg mt-10 hover:brightness-75 transition-all ease-out"
                >
                    <div className="text-2xl">
                        <FaUserFriends></FaUserFriends>
                    </div>
                    Friends
                </button>
            )}
            {props.status === "recieved" && (
                <button
                    className="flex w-full items-center justify-center gap-2 bg-white p-3 text-lg text-gray-800 
                        rounded-lg mt-10 hover:brightness-75 transition-all ease-out"
                >
                    <div className="text-2xl">
                        <FaUserFriends></FaUserFriends>
                    </div>
                    Accept Request
                </button>
            )}
        </form>
    );
}
