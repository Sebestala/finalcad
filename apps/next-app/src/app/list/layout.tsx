import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connection",
  description: "Connection page",
};

export default function ListLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className={`${inter.className} relative`}>{children}</div>;
}
