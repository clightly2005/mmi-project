import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/Nav";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "SkillSync | Project Matching",
  description: "Match your team to projects intelligently.",
};

export default function RootLayout({ children, }: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen ">
        <AuthProvider>
        <Navbar />
        <Toaster position="bottom-right" />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
          {children}
        </main>
            <footer className="mt-auto border-t border-neutral-200">
          <div className="pb-12 text-center text-xs text-neutral-500">
            {new Date().getFullYear()} SkillSync. All rights reserved.
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
