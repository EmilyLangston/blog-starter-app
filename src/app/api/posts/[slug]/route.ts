import { NextResponse } from "next/server";
import { deletePostBySlug, getPostBySlug } from "@/lib/api";
import { getServerSession } from "next-auth";

export async function DELETE(
    req: Request,
    { params }: { params: { slug: string } }
): Promise<Response> {
    const slug = params.slug;

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