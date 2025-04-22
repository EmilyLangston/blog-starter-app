import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/api";
import clientPromise from "@/lib/mongodb";
import { Post } from "@/interfaces/post";

// Fetch all posts
export async function GET() {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
}

export async function POST(req: Request) {
    const newPost: Post = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("posts").insertOne(newPost);

    return NextResponse.json(result);
}

export async function DELETE(slug: string) {
    const client = await clientPromise;
    const db = client.db();
    return db.collection("posts").deleteOne({ slug });
}