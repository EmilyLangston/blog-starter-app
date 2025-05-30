"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AddBlogButton() {
    const { data: session } = useSession();

    return (
        <Link href="/new-post">
            {session &&
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Post Blog
                </button>
            }
        </Link>
    );
}
