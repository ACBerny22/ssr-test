import Link from "next/link";
import { CiLogin, CiLogout } from "react-icons/ci";
import logout from "@/actions/log-out-action";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import { getUpdatedPb, getUser, pb, store } from "@/pocketbase";
import { cookies } from "next/headers";
import BurgerButton from "./BurgerButton";
import fetchCurrentUser from "@/actions/fetch-user-action";
import { User } from "@/interfaces/user";

export default async function NavBar(){

    const user = await getUser(cookies())
    let currentUser
    if(user){
        currentUser = await fetchCurrentUser(user?.id as string)
    }

    console.log(currentUser)

    return(
        <div className="fixed w-screen top-0 z-40">
            {user && currentUser &&
            <div className="flex w-full py-4 px-10 justify-between bg-gradient-to-r from-teal-400 to-violet-500  font-medium">
                <Link href={"/"} className="text-4xl font-black">Harmony Posts</Link>
                
                <div className="lg:flex lg:items-center lg:gap-3 hidden">
                    
                    <div className="text-lg">
                        {user.username}
                    </div>
                    
                    <div className='relative w-12 h-12 overflow-hidden rounded-full'>
                            <img className='object-cover w-full h-full rounded-full' src={`${process.env.NEXT_PUBLIC_DB_POCKET}/api/files/_pb_users_auth_/${currentUser.id}/${currentUser.avatar}`} 
                            />
                    </div>
                    <form action={logout}>
                        <input name="itemId" className="hidden"/>           
                        <button className="flex gap-3 p-3 rounded-lg bg-white/50 text-white
                            hover:bg-white/35 hover:border-zinc-900 transition-all ease-out" type="submit">
                                <div className="text-2xl"><CiLogout></CiLogout></div>
                        </button>
                    </form>
                </div>
                <BurgerButton user={user}></BurgerButton>
            </div>
            }
        </div>
    )
}