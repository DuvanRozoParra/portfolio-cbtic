import { Metadata } from "next";
import { CarouselAbout } from "@/components";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce al equipo de desarrolladores y diseñadores que hacen posible nuestro trabajo.",
};

export default function Home() {
  return <CarouselAbout />;
}
