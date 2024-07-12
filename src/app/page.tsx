

import { Metadata } from "next";
import { Landing } from "@/components/landing"

export const metadata: Metadata = {
  title: "Home",
  description: "Quieres mejorar tu futuro?",
};

export default function Home() {
  return <section className="w-full h-full bg-[#f8f8f8]">
    <Landing/>
  </section>;
}
