import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: { template: "Budget-App | %s", default: "Budget-App" },
  description: "Budget-App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
