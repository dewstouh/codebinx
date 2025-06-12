import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import project from "@/config/project";
import { Toaster } from "sonner";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { NuqsAdapter } from 'nuqs/adapters/next/app'


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
export const metadata: Metadata = {
  title: project.name + " | " + project.tagline,
  description: project.description,
  keywords: ["code sharing", "snippets", "CodeBinX", "online editor", "developer tools", "fullstack project", "typescript", "nextjs"],
  authors: [{ name: "Diego Rodríguez", url: "https://github.com/dewstouh" }],
  openGraph: {
    title: project.name + " | " + project.tagline,
    description: project.shortDescription,
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: project.name,
    type: project.openGraph.type,
    images: [],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>

      <body suppressHydrationWarning className="font-inter antialiased">
        <NuqsAdapter>
          <ClerkProvider
            appearance={{
              variables: {
                colorPrimary: "#3371FF",
                fontSize: "16px",
              }
            }}
          >
            <div className="overflow-x-hidden">
              {children}
            </div>
          </ClerkProvider>
        </NuqsAdapter>
        <Toaster richColors />
      </body>
    </html>
  );
}
