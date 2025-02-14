import { Metadata } from "next";
import { PendulumSimulator } from "@/components/PendulumArmonic";

export const metadata: Metadata = {
  title: "Pendulum",
};

export default function Home() {
  return (
    <section className="w-full h-full">
      <PendulumSimulator/>
    </section>
  );
}
