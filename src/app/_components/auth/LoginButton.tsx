"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <p>Welcome, <span className="font-semibold">{session.user?.name}</span></p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
    >
      Login with Google
    </button>
  );
}
