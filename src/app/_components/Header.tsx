"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./auth/LoginButton";

export default function Header() {
    const { data: session, status } = useSession();

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-700 shadow-sm mb-5">
            <Link
                href="/"
                className="text-4xl sm:text-5xl font-extrabold tracking-tight hover:opacity-90 transition"
            >
                Blogs
            </Link>

            <div className="flex items-center space-x-4">
                {status === "loading" ? (
                    <span className="text-gray-300 animate-pulse">Loading...</span>
                ) : (
                    <LoginButton />
                )}
            </div>
        </header>
    );
}
