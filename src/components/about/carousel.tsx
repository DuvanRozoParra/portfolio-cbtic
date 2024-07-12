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
    <main className="flex flex-col p-8 gap-5 bg-[#f8f8f8]">
      <div className="w-full h-screen flex justify-center items-center flex-col gap-4 bg-[#f8f8f8]">
        <div className="w-4/5 h-full relative">
          <Image
            src={"/images/fondo_unimeta.webp"}
            alt="fondo unimeta"
            fill
            className="w-full object-cover h-full object-top"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
            Sobre Nosotros
          </h1>
        </div>
        <section
          className="text-gray-600 body-font flex justify-
      center items-center flex-col gap-10 w-4/5 h-4/5"
        >
          <p className="text-justify">
            El Departamento de Ciencias Básicas de la Corporación Universitaria
            del Meta, es parte de la Escuela de Ingeniería de esta Institución,
            y cumple funciones de docencia, investigación y proyección social en
            el campo de las ciencias naturales, las matemáticas, la química y la
            biología. Este departamento tiene como función sustantiva la
            preparación integral de los futuros ingenieros, economistas y
            administradores de empresa que estudian en esta prestigiosa
            institución. Esto hace que el Departamento de Ciencias Básicas de
            UNIMETA, sea la columna vertebral de la formación de profesionales
            integrales, capaces de abarcar los problemas sociales, culturales y
            económicos de la región de la Orinoquia colombiana, desde una
            perspectiva cuantitativa, cualitativa y de cuidado del medio
            ambiente, de tal manera que los egresados de nuestra Institución
            Universitaria sean capaces de enfrentar los retos que la modernidad
            impone.
          </p>
          <div className="w-full flex flex-row justify-center items-stretch ">

            <div className="w-2/4 h-[50%]">
            <Image
            src={"/images/cbtic.jpg"}
            alt="fondo unimeta"
            width={500}
            height={500}
            className="w-full object-center h-full object-cover rounded-lg"
          />
            </div>
            <div className="flex flex-col justify-start items-center w-2/4 gap-10 px-12">
              <div>
                <h1 className="font-bold text-center text-xl">Misión</h1>
                <p className="text-justify">
                  Coadyuvar al desarrollo de planes, programas y proyectos de
                  formación, investigación, extensión, proyección social e
                  internacionalización en el campo de las ciencias básicas con
                  criterios de pertinencia, calidad y excelencia con el fin de
                  promover el avance científico y tecnológico de nuestra
                  universidad, nuestra región y el país.
                </p>
              </div>
              <div>
                <h1 className="font-bold text-center text-xl">Visión</h1>
                <p className="text-justify">
                  El departamento será líder en formación e investigación en el
                  campo de Ciencias Básicas en la UNIMETA, promoviendo el
                  interés y el acceso a las mismas, como base del desarrollo
                  tecnológico y científico de nuestra universidad, nuestra
                  región y el país.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="w-full h-full bg-[#f8f8f8] flex flex-col items-center justify-center relative gap-5">
        <section className="flex justify-center flex-col items-center w-4/5 gap-4">
          <h1 className="text-4xl font-bold">Equipo de trabajo</h1>
          <p className="text-lg text-center">
            Descubre cómo nuestro talentoso equipo de trabajo impulsa el
            crecimiento del “semillero” con su dedicación y experiencia,
            generando resultados increíbles
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
                          className={`object-contain rounded-t-sm  object-center`}
                          style={{
                            backgroundColor: `${
                              elemento.color ? `#${elemento.color}` : "#c0bfc4"
                            }`,
                          }}
                          fill
                          sizes="100% 100%"
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
    </main>
  );
}
