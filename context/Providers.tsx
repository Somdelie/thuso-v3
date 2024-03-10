// app/providers.tsx
"use client";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react"; // Import ReactNode type
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProvidersProps {
  children: ReactNode; // Explicitly define the type as ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ToastContainer />
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </ThemeProvider>
  );
}
