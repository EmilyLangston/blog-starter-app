import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { getServerSession } from "next-auth"; // or wherever you store auth
import DeleteBlogButton from "./blog/deleteBlogButton";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export async function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  const session = await getServerSession();

  async function handleDelete(slug: string) {
    await fetch(`/api/posts/${slug}`, {
      method: "DELETE",
    });
    window.location.reload(); // or re-fetch data dynamically
  }

  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
      {session?.user.name === author.name && (
        <DeleteBlogButton slug={slug} />
      )}
    </div>
  );
}
