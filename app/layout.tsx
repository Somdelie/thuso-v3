import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Providers } from "@/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Thuso.com",
    template: "%s | | Thuso.com",
  },
  icons: {
    icon: "/favicon.png", // /public path
  },
  description: "Best Freelancers you can find",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${inter.className} bg-gradient-to-b from-gray-300 to-white dark:from-gray-800 dark:to-gray-800 dark:bg-gray-800 transition `}
        >
          <Providers>
            <main className="min-h-screen">{children}</main>
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
