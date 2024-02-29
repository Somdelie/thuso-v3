// app/providers.tsx
"use client";
// import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react"; // Import ReactNode type

interface ProvidersProps {
  children: ReactNode; // Explicitly define the type as ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      {children}
    </ThemeProvider>
  );
}
