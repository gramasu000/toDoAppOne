"use client";

import Link from "next/link";
import "./globals.css";

function Header() {
  return (
    <div className="h-[5dvh] flex flex-row bg-[#0d1117] justify-between border-b">
      <Link
        href="/"
        className="flex flex-col justify-center px-8 hover:cursor-pointer hover:bg-[#24292f] hover:font-bold"
      >
        <p className="text-lg">ToDo App</p>
      </Link>
      <div className="flex flex-row">
        <Link
          href="/signup"
          className="flex flex-col justify-center px-8 hover:cursor-pointer hover:bg-[#24292f] hover:font-bold"
        >
          <p>Sign Up</p>
        </Link>
        <Link
          href="/login"
          className="flex flex-col justify-center px-8 hover:cursor-pointer hover:bg-[#24292f] hover:font-bold"
        >
          <p>Login</p>
        </Link>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="h-[5dvh] flex justify-end bg-[#0d1117] border-t">
      <a
        href="https://github.com/gramasu000"
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 flex flex-col justify-center hover:cursor-pointer hover:bg-[#24292f] hover:font-bold"
      >
        <p>Gautam Ramasubramanian</p>
      </a>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-dvh bg-[#0d1117] text-[#d6d5d3]">
        <Header></Header>
        <div className="h-[90dvh] overflow-auto">{children}</div>
        <Footer></Footer>
      </body>
    </html>
  );
}
