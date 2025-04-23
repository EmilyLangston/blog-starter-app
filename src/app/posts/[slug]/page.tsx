import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { Post } from "@/interfaces/post";

export default async function PostPage(props: { params: { slug: string } }) {
  const { slug } = await props.params; // 👈 await before accessing `slug`

  const post: Post | undefined = await getPostBySlug(slug);
  if (!post) return notFound();

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
          <PostBody content={content} ogImage={post.ogImage?.url || ""} />
        </article>
      </Container>
    </main>
  );
}