// src/app/page.tsx

import { getServerSession } from "next-auth";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import Link from "next/link";
import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { authOptions } from "./api/auth/route";
import AddBlogButton from "./_components/blog/addBlogButton";

export default async function IndexPage() {
  // Get session using getServerSession
  const session = await getServerSession(authOptions);

  // Fetch all posts
  const posts: Post[] = await getAllPosts();

  // Separate hero post and more posts
  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  // Render the page content
  return (
    <main>
      <Container>
        {/* Add Blog Button */}
        <div className="flex justify-end mb-6">
          <AddBlogButton />
        </div>

        {/* Hero Post */}
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}

        {/* More Posts */}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
