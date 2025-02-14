import { Metadata } from "next";
import { TeacherAbout } from "@/components/Teacher";

export const metadata: Metadata = {
  title: "Teacher",
};

export default function Home() {
  return (
    <section className="w-full h-full">
      <TeacherAbout/>   
    </section>
  );
}
