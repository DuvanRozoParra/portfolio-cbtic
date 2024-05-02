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

const ArrayEquipo = [
  {
    name: "DUVAN ALBERTO ROZO PARRA",
    image: "/images/Duvan.jpg",
    programa: "Estudiante de Ingenieria de Sistemas",
    work: "Lider del Equipo de Desarrollo",
  },
  {
    name: "DANIEL STEVEN MONTILLO CARDENAS",
    image: "/images/Montillo.jpg",
    programa: "Estudiante de Ingenieria de Sistemas",
    work: "Desarrollador Web",
  },
  {
    name: "JOHANN SEBASTIAN CALCHON SANCHEZ",
    image: "/images/Sebastian.jpg",
    programa: "Estudiante de Ingenieria de Sistemas",
    work: "Programador",
  },
  {
    name: "NAZLY DIANEY MARTINEZ ROZO",
    image: "/images/Nazly.jpg",
    programa: "Estudiante Mercadeo y publicidad",
    work: "Diseñadora",
  },
  {
    name: "JUAN DIEGO GUZMÁN MASSO",
    image: "/images/Guzman.jpg",
    programa: "Estudiante de Ingenieria de Sistemas",
    work: "Programador",
  },
  {
    name: "BRAYAN DANIEL GUEVARA TABARES",
    image: "/images/Brayan.jpg",
    programa: "Estudiante de Ingenieria de Sistemas",
    work: "Programador",
  },
  {
    name: "EDUAR ALEJANDRO SANCHEZ PERILLA",
    image: "/images/Eduardo.jpg",
    programa: "Estudiante de Ingenieria de Sistemas",
    work: "Programador",
    color: "c4c4c4",
  },
  {
    name: "BRAYAN STIVEN ROJAS RODRÍGUEZ",
    image: "/images/Rojas.jpg",
    programa: "Estudiante de Ingenieria de Sistemas",
    work: "Programador",
  },
  {
    name: "ANDRÉS FELIPE MARTÍNEZ GONZÁLEZ",
    image: "/images/1.jpg",
    programa: "Estudiante de Ingenieria de Sistemas",
    work: "Programador",
    color: "c4c4c4",
  },
  {
    name: "FIDEL BAUTISTA RODRIGUEZ PUERTAS",
    image: "/images/fidel.png",
    programa: "Profesor De Ciencias Basicas",
    work: "Fisico",
    color: "979497",
  },
  {
    name: "DIEGO ANDRES PALTA PRADO",
    image: "/images/Profesor1.jpg",
    programa: "Profesor De Ciencias Basicas",
    work: "Fisico",
  },
];

export function CarouselAbout() {
  return (
    <section className="w-full h-full bg-[#f8f8f8] flex flex-col items-center justify-center">
      <section className="flex justify-center flex-col items-center w-4/5 gap-4">
        <h1 className="text-4xl font-bold">Equipo de trabajo</h1>
        <p className="text-lg text-center">
          Descubre cómo nuestro talentoso equipo de trabajo impulsa el
          crecimiento del “semillero” con su dedicación y experiencia, generando
          resultados increíbles
        </p>
      </section>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-4/5 h-3/4 flex flex-col items-center justify-center"

      >
        <CarouselContent className="">
          {ArrayEquipo.map((elemento, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 aspect-square"
            >
              <Card className="w-full h-full">
                <CardContent className="flex flex-col items-center justify-center w-full h-full p-0">
                  <section className="w-full h-full relative">
                    <div className={`w-full h-full`}>
                      <Image
                        src={elemento.image}
                        alt={`Foto-de-perfil-de-${elemento.name}`}
                        className={`object-contain rounded-t-sm `}
                        style={{
                          backgroundColor: `${
                            elemento.color ? `#${elemento.color}` : "#c0bfc4"
                          }`,
                        }}
                        layout="fill"
                        objectFit="contain"
                        sizes="100% 100%"
                        objectPosition="center"
                      />
                    </div>
                  </section>
                  <section className="flex flex-col justify-center items-center p-4 text-center">
                    <h1 className="font-bold">{elemento.name}</h1>
                    <h2>{elemento.programa}</h2>
                    <h2>{elemento.work}</h2>
                  </section>
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
