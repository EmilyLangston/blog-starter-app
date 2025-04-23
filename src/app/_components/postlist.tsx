'use client';

import { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import Container from "@/app/_components/container";

export default function PostList({ posts, currentUsername }: { posts: Post[]; currentUsername: string | null; }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return (
            <Container>
                <div className="space-y-6">
                    <div className="h-48 bg-gray-200 animate-pulse rounded-lg" />
                    <div className="h-32 bg-gray-200 animate-pulse rounded-lg" />
                    <div className="h-32 bg-gray-200 animate-pulse rounded-lg" />
                </div>
            </Container>
        );
    }

    const heroPost = posts[0];
    const morePosts = posts.slice(1);

    return (
        <Container>
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

            {morePosts.length > 0 && <MoreStories posts={morePosts} currentUsername={currentUsername} />}
        </Container>
    );
}
