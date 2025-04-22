import clientPromise from "./mongodb";
import { Post } from "@/interfaces/post";

export async function getAllPosts() {
  const client = await clientPromise;
  const db = client.db(); // optional: pass your DB name here
  const posts = await db.collection("posts").find({}).toArray();
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const client = await clientPromise;
  const db = client.db();
  const decodedSlug = decodeURIComponent(slug);
  const post = await db.collection("posts").findOne({ slug: decodedSlug });
  return post as Post | null;
}

export async function deletePostBySlug(slug: string) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection("posts").deleteOne({ slug });

  return result.deletedCount === 1;
}