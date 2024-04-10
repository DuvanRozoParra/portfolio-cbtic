import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselAbout() {
  return (
    <section className="w-full h-full bg-blue-600 flex flex-col items-center justify-center">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-3/5 h-3/4 flex flex-col items-center justify-center"
      >
        <CarouselContent className="bg-red-500">
          {Array.from({ length: 12 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src="https://picsum.photos/200"
                    alt="Foto-de-perfil-de-[Nombre del desarrollador o diseñador]"
                    width={200}
                    height={200}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
