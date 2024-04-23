import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <Link href="/login">
      <a>Login</a>
    </Link>
  );
}
