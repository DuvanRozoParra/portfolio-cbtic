import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const ArrayEquipo = [
  {
    name: "MARÍA ALEJANDRA CRUZ DOMÍNGUEZ",
    image: "/images/Profesores/María Alejandra Cruz Domínguez.jpg",
    estudios: [
      "Magíster en Gestión Ambiental y Energética de las Organizaciones - UNIR",
      "Magíster (c) en Tecnología Educativa y Competencias Digitales - UNIR",
    ],
    work: "Jefe de Departamento Ciencias Básicas (E)",
  },
  {
    name: "ELIANA MARÍTZA TULCÁN MEJÍA",
    image: "/images/Profesores/Eliana Marítza Tulcán Mejía.png",
    estudios: ["Química de Alimentos - UPTC", "Magíster en Química - UPTC"],
    work: "Docente",
  },
  {
    name: "JOHAN RICARDO MORALES ORTÍZ",
    image: "/images/Profesores/Johan Ricardo Morales Ortíz.jpg",
    estudios: ["Ingeniero Agroindustrial - Unillanos"],
    work: "Jefe de Laboratorios",
  },
  {
    name: "HAZLITT ENERIETH NIÑO MENDIVELSO",
    image: "/images/Profesores/Hazlitt Enerieth Niño Mendivelso.jpg",
    estudios: [
      "físico - UPTC",
      "magíster en didáctica de la física y la química en educación secundaria y bachillerato - UNIR",
    ],
    work: "Consejera de Ciencias Básicas",
  },
  {
    name: "MARIBEL DUQUE LÓPEZ",
    image: "/images/Profesores/Maribel Duque López.jpg",
    estudios: [
      "Matemático - Universidad Central",
      "Magíster en Educación - Corporación Universitaria Minuto de Dios",
      "Ingeniería de Telecomunicaciones (en curso) - Universidad Nacional Abierta y a Distancia",
    ],
    work: "Docente",
  },
  {
    name: "JAVIER GUILLERMO BERNAL AGUILAR",
    image: "/images/Profesores/Javier Guillermo Bernal Aguilar.jpg",
    estudios: [
      "Ingeniero Químico - Universidad de América",
      "Magíster en Ingeniería Avanzada de Producción Logística y Cadena de Suministro - Universidad Politécnica de Valencia",
    ],
    work: "Docente",
  },
  {
    name: "DIEGO ANDRÉS PALTA PRADO",
    image: "/images/Profesores/Diego Andrés Palta Prado.jpg",
    estudios: [
      "Ingeniero Físico - Universidad del Cauca",
      "Magíster (c) en Biotecnología - Universidad del Cauca ",
    ],
    work: "Docente",
  },
  {
    name: "DAVID FELIPE CASTAÑEDA ANGARITA",
    image: "/images/Profesores/David Felipe Castañeda Angarita.png",
    estudios: [
      "Licenciado en Matemáticas y Física",
      "Universidad de los Llanos",
      "Magíster (c) en Educación STEAM para el Desarrollo Social",
    ],
    work: "Docente",
  },
  {
    name: "SANTIAGO ALEJANDRO ZÚÑIGA MELO",
    image: "/images/Profesores/Santiago Alejandro Zúñiga Melo.jpg",
    estudios: [
      "Ingeniero Físico - Universidad del Cauca",
      "Magíster(c) en Ciencia de Datos",
    ],
    work: "Docente",
  },
  {
    name: "FIDEL BAUTISTA RODRIGUEZ PUERTAS",
    image: "/images/fidel.png",
    estudios: [
      "Físico - Universidad de la Habana Cuba",
      "Magíster en Física - Universidad de la Habana Cuba",
      "Doctor en Física Teórica - Universidad de la Habana Cuba",
    ],
    work: "Docente",
  },
  {
    name: "ESNEIDER LEANDRO GARAVITO PÉREZ",
    image: "/images/Profesores/Esneider Leandro Garavito Pérez.jpg",
    estudios: ["Físico - UPTC"],
    work: "Docente",
  },
  {
    name: "Alejandro Calderón Vásquez",
    image: "/images/Profesores/Alejandro Calderón Vásquez.jpg",
    estudios: [
      "Licenciado en Matemáticas y Física - Universidad de los Llanos",
      "Especialización en Proyectos de Desarrollo - Escuela Superior de Administración Pública (ESAP)",
    ],
    work: "Docente",
  },
  {
    name: "Jesús Alejando González Rojas",
    image: "/images/Profesores/Jesús Alejando González Rojas.jpg",
    estudios: [
      "Biólogo - Universidad de los Llanos",
      "Magíster (c) en Gestión de Cuencas Hidrográficas - Universidad Santo Tomás",
    ],
    work: "Docente",
  },
];

export function TeacherAbout() {
  return (
    <main className="flex flex-col p-8 gap-5 bg-[#f8f8f8] justify-center items-center">
      <div className="w-4/5 h-40 md:h-40 flex justify-center items-center">
        <div className="relative w-full h-full rounded-md overflow-hidden">
          <Image
            src="/images/fondo_unimeta.webp"
            alt="Fondo institucional de la Unimeta"
            fill
            className="object-cover object-center blur-sm"
          />
          <div
            className="absolute inset-0 bg-black opacity-50"
            aria-hidden="true"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Nuestros Docentes:
          </h1>
        </div>
      </div>

      <section className="w-full flex flex-col items-center justify-center gap-5">
        <div className="w-4/5 text-center mb-2">
          <h2 className="text-4xl font-bold mb-4">Equipo de trabajo</h2>
          <p className="text-lg text-center">
            El equipo de docentes en Ciencias Básicas es el pilar fundamental de nuestra institución, comprometido con la formación integral de nuestros estudiantes. Con años de experiencia en sus respectivas áreas y un profundo amor por la enseñanza, nuestros docentes no solo transmiten conocimientos, sino que también inspiran el desarrollo de habilidades críticas y analíticas en cada uno de sus alumnos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-4/5">
          {ArrayEquipo.map((elemento, index) => (
            <Card
              key={index}
              className="bg-white border-b border-gray-300 transform transition-transform duration-200 ease-in-out hover:bg-gray-200 hover:scale-105 active:scale-100"
            >
              <CardContent className="flex flex-col items-center">
                <section className="relative w-full h-48 flex-shrink-0 mb-2">
                  <Image
                    src={elemento.image}
                    alt={`Foto de perfil de ${elemento.name}`}
                    className="object-contain rounded-t-sm object-center mt-4"
                    style={{ backgroundColor: "#ffffff" }}
                    fill
                    sizes="100% 100%"
                  />
                </section>
                <section className="p-4 text-center flex flex-col gap-2">
                  <h3 className="font-bold">{elemento.name}</h3>
                  <div className="space-y-1">
                    {elemento.estudios.map((estudio, i) => (
                      <p key={i} className="text-sm">
                        {estudio}
                      </p>
                    ))}
                  </div>
                  <p className="font-bold">{elemento.work}</p>
                </section>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
