import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { Post } from "@/interfaces/post";
import Image from "next/image";

type Params = {
  params: {
    slug: string;
  };
};

export default async function Post({ params }: Params) {
  const post: Post | undefined = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author || { name: "", picture: "" }}
          />
          <PostBody content={content} ogImage={post.ogImage.url} />
        </article>
      </Container>
    </main>
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post: Post | undefined = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage?.url || ""],
    },
  };
}

export async function generateStaticParams() {
  const posts: Post[] = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
