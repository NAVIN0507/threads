import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../globals.css"
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";

const inter = Inter({
  subsets:["latin"]
})
export const metadata: Metadata = {
  title: "Threads",
  description: "Share your threads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={inter.className}> 
<Topbar/>
<main className="flex flex-row">
  <LeftSidebar/>
  <section className="main-container">
    <div className="w-full max-w-4xl">
      {children}
    </div>
  </section>
  <RightSidebar/>
</main>
<Bottombar/>
      </body>
    </html>
    </ClerkProvider>
  );
}
