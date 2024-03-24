import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navigation from "./ui/shared/navigation";

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
        <main
          className="w-11/12 h-[80%] bg-[#faf9fd] rounded-lg flex flex-col md:flex-row overflow-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          <Navigation />
          <div
            className="w-full overflow-y-auto mb-5 md:mb-0"
            style={{ scrollbarWidth: "none" }}
          >
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
