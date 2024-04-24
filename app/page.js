"use client";
import { useState } from "react"; 
import Link from "next/link";
import { useUserAuth } from "./auth-context"; 

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  // TODO: Implement handleSignIn and handleSignOut functions using gitHubSignIn and firebaseSignOut from useUserAuth
  const handleSignIn = () => {
    gitHubSignIn().catch(error => console.error("Error signing in:", error));
  };

  const handleSignOut = () => {
    firebaseSignOut().catch(error => console.error("Error signing out:", error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white rounded-lg shadow p-6">
    {user ? (
      <>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Bussiness Connect, {user.displayName}!</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/home">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition ease-in-out duration-150">View Weather</button>
          </Link>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition ease-in-out duration-150"
          >
            Sign Out
          </button>
        </div>
      </>
    ) : (
      <div className="text-center">
        <p className="text-lg text-gray-800 mb-4">Please sign in to access Bussiness Connect.</p>
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition ease-in-out duration-150"
        >
          Sign In with GitHub
        </button>
      </div>
    )}
  </div>
</div>
  );
}
