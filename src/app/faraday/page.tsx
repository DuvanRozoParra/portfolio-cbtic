import { Metadata } from "next";
import { LawFaradayPage } from "@/components/LawFaraday"

export const metadata: Metadata = {
  title: "Home",
  description: "Quieres mejorar tu futuro?",
};

export default function Home() {
  return <section className="w-screen h-screen">
    <LawFaradayPage />
  </section>;
}
