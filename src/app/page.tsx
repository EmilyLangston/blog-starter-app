// src/app/page.tsx

import { getServerSession } from "next-auth";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import Container from "@/app/_components/container";
import AddBlogButton from "./_components/blog/addBlogButton";
import PostList from "./_components/postlist";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function IndexPage() {
  // Get session using getServerSession
  const session = await getServerSession(authOptions);
  const currentUsername = session?.user?.name ?? null;

  // Fetch all posts
  const posts: Post[] = await getAllPosts();

  // Render the page content
  return (
    <main>
      <Container>
        {/* Add Blog Button */}
        <div className="flex justify-end mb-6">
          <AddBlogButton />
        </div>

        <PostList posts={posts} currentUsername={currentUsername} />
      </Container>
    </main>
  );
}
