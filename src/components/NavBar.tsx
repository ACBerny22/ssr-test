import { pb } from "@/pocketbase";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import PostCard from "@/components/PostCard";
import { FaFeatherAlt } from "react-icons/fa";
import { CiLogin, CiLogout } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { cookies } from "next/headers";
import { getUser } from "@/pocketbase";
import { redirect } from "next/navigation";


export default async function NavBar(){

    const user:any = await getUser(cookies())
    
    const logout = async () => {
        "use server"
        pb.authStore.clear();
        cookies().delete('pb_auth')

        revalidatePath("/posts")
        redirect("/")
    }

    return(
        <div>

            {user &&
            <div className="flex py-7 px-10 justify-between bg-gradient-to-r from-cyan-500 to-blue-500  ">
                <Link href={"/"} className="text-4xl font-black">Harmony Posts</Link>
                <div className="flex gap-3">
                    <Link href={"/posts/create"} className="flex gap-3 p-3 backdrop-blur-xl bg-white/30 rounded-lg
                    text-white hover:bg-transparent hover:text-white transition-all ease-out">
                    <div className="mt-1 text-lg">
                        <FaFeatherAlt></FaFeatherAlt>
                    </div>
                    New Post
                    </Link>
                    {!cookies().get('pb_auth') ?
                        <Link href={"/auth/login"} className="flex gap-3 p-3  border border-white rounded-lg
                        bg-transparent text-white hover:bg-zinc-600 hover:border-zinc-900 transition-all ease-out">
                            <div className="text-2xl">
                                <CiLogin />
                            </div>
                            Log In
                        </Link>
                    :   <form action={logout}>
                            <input name="itemId" className="hidden"/>
                            <button className="flex gap-3 p-3  border border-white rounded-lg
                            bg-transparent text-white hover:bg-zinc-600 hover:border-zinc-900 transition-all ease-out" type="submit">
                                <div className="text-2xl"><CiLogout></CiLogout></div>
                                Log Out
                            </button>
                        </form>
                    }
                </div>
            </div>
            }
        </div>
    )
}