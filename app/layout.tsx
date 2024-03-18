import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Providers } from "@/context/Providers";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

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
  // const user = await currentUser();

  // console.log(user);

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${inter.className} text-muted-foreground dark:from-gray-800 dark:to-gray-800 dark:bg-gray-800 transition `}
        >
          <Providers>
            <ToastContainer />
            <Toaster position="top-center" reverseOrder={false} />
            <main className="min-h-screen">{children}</main>
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
