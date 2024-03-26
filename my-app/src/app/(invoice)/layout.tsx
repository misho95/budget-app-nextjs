import type { Metadata } from "next";
import "@/app/globals.css";
import Navigation from "../ui/shared/navigation";

export const metadata: Metadata = {
  title: { template: "Budget-App | %s", default: "Budget-App" },
  description: "Budget-App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-11/12 h-[80%] bg-[#faf9fd] rounded-lg flex flex-col md:flex-row overflow-hidden">
      <Navigation />
      <div
        className="w-full overflow-y-auto mb-5 md:mb-0"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>
    </main>
  );
}
