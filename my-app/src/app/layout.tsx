import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "@/app/globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget-App",
  description: "Budget-App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} bg-[#ff9984] flex justify-center items-center w-full h-screen overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
