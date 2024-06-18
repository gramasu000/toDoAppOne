"use client";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
