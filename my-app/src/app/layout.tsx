import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import Header from "./ui/shared/header";
import Footer from "./ui/shared/footer";

const georgian = Noto_Sans_Georgian({ subsets: ["latin"] });

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
      <body className={georgian.className}>
        <main className="bg-snow w-full h-screen flex flex-col justify-between">
          <Header />
          <div className="h-full p-5">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
