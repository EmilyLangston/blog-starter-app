// src/app/api/posts/[slug]/route.ts
import { NextResponse } from "next/server";
import { deletePostBySlug, getPostBySlug } from "@/lib/api";
import { getServerSession } from "next-auth"; // Or your custom auth

export async function DELETE(
    req: Request,
    context: { params: { slug: string } }
) {
    const session = await getServerSession(); // get current user
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = context.params;

    const post = await getPostBySlug(slug);
    if (!post || post.author.name !== session.user?.name) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await deletePostBySlug(slug);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}
