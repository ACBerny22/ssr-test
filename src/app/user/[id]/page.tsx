import { cookies } from "next/headers";
import fetchCurrentUser from "@/actions/fetch-user-action";
import { getUser } from "@/pocketbase";
import { sendFreindRequest } from "@/actions/friend-controller-action";
import { findStatus } from "@/actions/friend-controller-action";
import FriendHandlerButton from "@/components/FriendHandlerButton";
import { cancelRequest } from "@/actions/friend-controller-action";
import { fetchPostsPerUser } from "@/actions/fetch-post-action";
import { acceptFriendRequest } from "@/actions/friend-controller-action";
import PostCard from "@/components/PostCard";
import { revalidatePath } from "next/cache";

interface pageProps {
    params: {
        id: string;
    };
}

export default async function page({ params }: pageProps) {
    revalidatePath("/user/[id]", "page");

    const user: any = await fetchCurrentUser(params.id);
    const recentPosts = await fetchPostsPerUser(1, params.id);
    const loggedUser = await getUser(cookies());
    let status: string = "init";

    if (loggedUser) {
        const request: any = await findStatus(loggedUser.id, params.id);
        status = request.status;
    }

    const sendFreindRequestWithId = sendFreindRequest.bind(
        null,
        params.id as any
    );

    const cancelFreindRequestWithId = cancelRequest.bind(
        null,
        params.id as any
    );

    const acceptFriendRequestWithId = acceptFriendRequest.bind(
        null,
        params.id as any
    );

    return (
        <main className="flex flex-col py-10 px-5 sm:px-40 gap-10 xl:px-60">
            <section className="flex flex-col lg:flex-row gap-10">
                <div className="relative w-28 h-28 lg:w-48 lg:h-48 overflow-hidden rounded-full">
                    <img
                        className="object-cover w-full h-full rounded-full"
                        src={`${process.env.NEXT_PUBLIC_DB_POCKET}/api/files/_pb_users_auth_/${user?.id}/${user?.avatar}`}
                        alt={`${user?.username}`}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl ">{user.name}</h1>
                    <p className="text-xl font-light">@{user.username}</p>
                    <FriendHandlerButton
                        friendAction={
                            status === undefined
                                ? sendFreindRequestWithId
                                : status === "recieved"
                                ? acceptFriendRequestWithId
                                : cancelFreindRequestWithId
                        }
                        status={status}
                    ></FriendHandlerButton>
                </div>
            </section>
            <section className="flex flex-col gap-5">
                <h1 className="text-2xl">Recent Posts</h1>
                <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-5">
                    {recentPosts.items.map((item) => (
                        <PostCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            currentUser={user} //Bc holly shit man.
                            content={item.content}
                            date={item.date}
                            user={item.expand?.user}
                            likes={item.expand?.["likedBy(post_to)"]}
                            comments={item.expand?.["comments(post_to)"]}
                        ></PostCard>
                    ))}
                </div>
            </section>
        </main>
    );
}
