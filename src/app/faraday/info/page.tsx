import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <section className="p-14">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Inducción electromagnética
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Al fenómeno que se produce cuando aparece un movimiento ordenado de
        cargas eléctricas asociado con una variación del campo magnético se le
        conoce como “inducción electromagnética” La forma más sencilla de
        observar el fenómeno de la inducción electromagnética fue descubierta
        por Michael Faraday cuando midió la corriente que circula por una espira
        metálica cuando se hace variar el flujo del vector intensidad del campo
        magnético al atravesar la superficie delimitada por la espira
      </p>
      <br />
      <div className="text-red-500 font-bold underline">
        <Link href="/faraday">Interacción - Variación del Campo</Link>
      </div>
    </section>
  );
};

export default Page;
