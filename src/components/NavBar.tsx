import Link from "next/link";
import { CiLogin, CiLogout } from "react-icons/ci";
import logout from "@/actions/log-out-action";
import { getUpdatedPb, getUser, pb, store } from "@/pocketbase";
import { cookies } from "next/headers";
import BurgerButton from "./BurgerButton";
import fetchCurrentUser from "@/actions/fetch-user-action";
import { FaBell } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";

export default async function NavBar() {
    const user = await getUser(cookies());
    let currentUser;
    if (user) {
        currentUser = await fetchCurrentUser(user?.id as string);
    }

    console.log(currentUser);

    return (
        <div className="fixed w-screen top-0 z-40">
            {user && currentUser && (
                <div className="flex w-full py-4 px-10 justify-between bg-gradient-to-r from-teal-400 to-violet-500  font-medium">
                    <Link href={"/"} className="text-4xl font-black">
                        Harmony Posts
                    </Link>
                    <div className="lg:flex lg:justify-center lg:items-center lg:gap-3 hidden">
                        <div className="text-lg flex items-center gap-10">
                            <div className="text-2xl">
                                <FaBell></FaBell>
                            </div>
                            <div>
                                {user.username}
                                <form action={logout}>
                                    <input name="itemId" className="hidden" />
                                    <button
                                        className="flex gap-1 px-3  py-[2px]  rounded-lg bg-red-400 text-white text-sm items-center font-light
                                    hover:bg-red-500 hover:border-zinc-900 transition-all ease-out"
                                        type="submit"
                                    >
                                        <div className="text-md">
                                            <IoLogOutSharp></IoLogOutSharp>
                                        </div>
                                        Logout
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="relative w-12 h-12 overflow-hidden rounded-full">
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src={`${process.env.NEXT_PUBLIC_DB_POCKET}/api/files/_pb_users_auth_/${currentUser.id}/${currentUser.avatar}`}
                            />
                        </div>
                    </div>
                    <BurgerButton user={user}></BurgerButton>
                </div>
            )}
        </div>
    );
}
