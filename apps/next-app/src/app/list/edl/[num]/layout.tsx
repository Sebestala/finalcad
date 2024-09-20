import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: { params: { num: string } }): Promise<Metadata> {
  return {
    title: `EDL ${params.num}`,
    description: `Page EDL ${params.num}`,
  };
}

// export const metadata: Metadata = {
//   title: "EDL",
//   description: "EDL page",
// };

export default function EDLLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className={`${inter.className} relative`}>{children}</div>;
}
