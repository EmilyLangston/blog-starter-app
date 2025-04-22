"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Importing useSession
import { Post } from "@/interfaces/post";
import { Author } from "@/interfaces/author";

export default function NewPostPage() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [ogImage, setOgImage] = useState("");
    const [author, setAuthor] = useState<Author>({ name: "", picture: "" });

    const { data: session, status } = useSession(); // Using useSession to fetch session data
    const router = useRouter();

    // Set author details when session is available
    useEffect(() => {
        if (session?.user) {
            setAuthor({
                name: session.user.name || "", // Set name from session if available
                picture: session.user.image || "", // Set picture from session if available
            });
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Get the current date and time
        const currentDate = new Date().toISOString();

        const newPost: Post = {
            title,
            slug,
            content,
            coverImage,
            author,
            excerpt,
            ogImage: { url: ogImage },
            date: currentDate, // Automatically set date to current date
        };
        const res = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        });

        if (res.ok) {
            router.push("/"); // Redirect after post creation
        } else {
            alert("Failed to create post");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
                <h1 className="text-3xl font-semibold text-gray-900">Create New Post</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                                Slug
                            </label>
                            <input
                                type="text"
                                id="slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                                Cover Image URL
                            </label>
                            <input
                                type="text"
                                id="coverImage"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        {/* Hidden Author Name and Author Picture fields (will be set automatically from session) */}
                        <input type="hidden" value={author.name} />
                        <input type="hidden" value={author.picture} />

                        <div>
                            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                                Excerpt
                            </label>
                            <textarea
                                id="excerpt"
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={3}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700">
                                OG Image URL
                            </label>
                            <input
                                type="text"
                                id="ogImage"
                                value={ogImage}
                                onChange={(e) => setOgImage(e.target.value)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                Content
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={6}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mt-4 inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
