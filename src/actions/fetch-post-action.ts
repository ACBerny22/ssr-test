"use server";

import { Post } from "@/interfaces/posts";
import { pb, getUpdatedPb } from "@/pocketbase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function fetchPosts(page: number) {
    await getUpdatedPb(cookies());

    const records = await pb.collection("posts").getList(page, 6, {
        sort: "-created",
        expand: "user, comments(post_to), likedBy(post_to)",
    });

    console.log(records);

    revalidatePath("/posts");

    if (records.items[0].expand) {
        console.log(records.items[0].expand["likedBy(post_to)"]);
    }

    return records;
}

export async function fetchPostsPerUser(page: number, user: string) {
    await getUpdatedPb(cookies());
    const records = await pb.collection("posts").getList(page, 3, {
        filter: `user = "${user}"`,
        sort: "-created",
        expand: "user, comments(post_to), likedBy(post_to)",
    });
    return records;
}

export async function fetchPost(id: string) {
    await getUpdatedPb(cookies());

    const record = await pb.collection("posts").getFirstListItem(`id="${id}"`, {
        expand: "user ",
    });
    return record;
}
