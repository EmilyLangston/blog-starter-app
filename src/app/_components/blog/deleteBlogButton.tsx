"use client";

export default function DeleteBlogButton({ slug }: { slug?: string }) {
    async function handleDelete() {
        await fetch(`/api/posts/${slug}`, {
            method: "DELETE",
        });
        window.location.reload(); // or re-fetch data dynamically
    }

    return (
        <button
            className="mt-4 ml-4 px-3 py-1 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition duration-150"
            title="Delete post"
            onClick={() => handleDelete()}>
            🗑️
        </button>
    );
}
