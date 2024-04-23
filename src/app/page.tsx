

import { Metadata } from "next";
import { Landing } from "@/components/landing"

export const metadata: Metadata = {
  title: "Home",
  description: "Quieres mejorar tu futuro?",
};

export default function Home() {
  return <section className="w-screen h-screen">
    <Landing/>
  </section>;
}
