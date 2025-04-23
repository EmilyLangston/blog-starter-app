"use client";

import { useState } from "react";

export default function DeleteBlogButton({ slug }: { slug?: string }) {
    const [showModal, setShowModal] = useState(false);

    async function handleDelete() {
        if (!slug) {
            console.error("Slug is undefined.");
            return;
        }

        try {
            // const res = await fetch(`/api/posts/${slug}`, {
            //     method: "DELETE",
            // });

            const res = await fetch("/api/posts/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(slug),
            });

            if (!res.ok) {
                throw new Error(`Failed to delete: ${res.statusText}`);
            }

            setShowModal(false);
            window.location.reload(); // or use router.refresh()
        } catch (err) {
            console.error("Delete failed:", err);
        }
    }

    return (
        <>
            {/* Theme-Aware Delete Button */}
            <button
                className="inline-flex items-center gap-2 mt-4 ml-4 px-4 py-2 text-sm font-medium rounded-xl shadow transition-colors
                   bg-gray-100 hover:bg-gray-200 text-gray-900
                   dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100"
                onClick={() => setShowModal(true)}
            >
                🗑️ Delete
            </button>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70">
                    <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-xl w-[90%] max-w-sm">
                        <h2 className="text-xl font-semibold mb-3">Confirm Deletion</h2>
                        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
                            Are you sure you want to delete this post? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 transition"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700 transition"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
