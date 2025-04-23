import { deletePostBySlug, getPostBySlug } from "@/lib/api";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const slug: string = await req.json();

    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await getPostBySlug(slug);
    if (!post || post.author.name !== session.user?.name) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await deletePostBySlug(slug);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}