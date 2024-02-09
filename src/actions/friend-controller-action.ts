"use server";

import { pb, getUpdatedPb, getUser } from "@/pocketbase";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function sendFreindRequest(fromData: FormData) {
    await getUpdatedPb(cookies());
    console.log("active");
    const currentUser = await getUser(cookies());
    if (currentUser) {
        const data = {
            user: currentUser.id,
            friend: fromData,
            status: "requested",
        };
        console.log(data);
        const record = await pb.collection("user_friend").create(data);
    }
    revalidatePath("/user/[id]", "page");
}

export async function acceptFriendRequest(formData: FormData) {
    await getUpdatedPb(cookies());
    const currentUser = await getUser(cookies());
    if (currentUser) {
        console.log(
            "accepted by: " + currentUser.id + " from user: " + formData
        );
    }
}

export async function declineFriendRequest(fromData: FormData) {
    await getUpdatedPb(cookies());
    const currentUser = await getUser(cookies());
    if (currentUser) {
        const data = {
            user: currentUser.id,
            friend: fromData,
            status: "rejected",
        };
        //console.log(data);
    }
    //const record = await pb.collection('user_friend').create(data);
}

export async function cancelRequest(formData: FormData) {
    await getUpdatedPb(cookies());
    const currentUser = await getUser(cookies());
    console.log(formData);
    if (currentUser) {
        const record = await findStatus(currentUser.id, formData);
        console.log(record);
        if (record) {
            await pb.collection("user_friend").delete(record.id);
        }
    }
    revalidatePath("/user/[id]", "page");
}

// User es quien manda la solicud de amistad, friend es quien la recibe.
export async function findStatus(user: string, userFriend: any) {
    await getUpdatedPb(cookies());

    try {
        const record = await pb
            .collection("user_friend")
            .getFirstListItem(`user="${user}" && friend="${userFriend}"`, {
                cache: "no-store",
            });
        return record;
    } catch (error) {
        try {
            const record = await pb
                .collection("user_friend")
                .getFirstListItem(`user="${userFriend}" && friend="${user}"`, {
                    cache: "no-store",
                });
            console.log(record);
            if (record.status === "requested") {
                console.log("recieved");
                return { status: "recieved" };
            }
            return record.status;
        } catch (error) {
            return false;
        }
    }
}
