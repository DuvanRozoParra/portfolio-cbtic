"use client";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

interface ToastConfig {
  id: string;
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  separator?: string;
}

interface TermConfig extends ToastConfig {
  text: string;
}

const TERMS_CONFIG: TermConfig[] = [
  {
    id: "rectilineo",
    text: "trayectoria rectilínea",
    imageSrc: "/images/rectilineo.gif",
    altText: "rectilineo",
    title: "¿Qué es la trayectoria rectilínea?",
    description: "Es cuando el objeto sigue una línea recta durante su movimiento, los cuerpos que tienen este tipo de movimiento se dice que tienen un movimiento rectilíneo, por ejemplo: La caída de un objeto.",
    separator: ", "
  },
  {
    id: "acotado",
    text: "es acotado",
    imageSrc: "/images/teorema_acotacion.jpg",
    altText: "acotado",
    title: "¿Qué es Acotado?",
    description: "Con topes o límites por alguno de sus lados o todos ellos, de manera que no se puede salir de ese espacio resultante.",
    separator: ", "
  },
  {
    id: "periodico",
    text: " periódico",
    imageSrc: "/images/periodico.gif",
    altText: "periódico",
    title: "¿Qué es Movimiento periódico?",
    description: "Se denomina movimiento periódico a todo aquél que se repite a intervalos regulares de tiempo. Ej. Péndulo, rotación de la tierra en torno al Sol, movimiento de las manecillas de un reloj, etc.",
    separator: " , "
  },
  {
    id: "variable",
    text: " variable",
    imageSrc: "/images/Mov_Variable.gif",
    altText: "variable",
    title: "¿Qué es Variable?",
    description: "Se refiere al acto de cambiar de posición o ubicación, y sus variables incluyen distancia, desplazamiento, velocidad, velocidad y aceleración.",
    separator: "."
  }
];

class ToastFactory {
  static createToastHandler(config: ToastConfig) {
    return () => toast(
      <div className="flex flex-col items-center justify-center">
        <img src={config.imageSrc} alt={config.altText} className="w-2/3 h-1/3" />
        <p className="font-semibold mt-2">{config.title}</p>
        <p className="text-center">{config.description}</p>
      </div>,
      {
        duration: 2000,
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      }
    );
  }
}

const createNotifyHandlers = (configs: TermConfig[]) => {
  return configs.reduce((acc, config) => {
    acc[config.id] = ToastFactory.createToastHandler(config);
    return acc;
  }, {} as Record<string, () => void>);
};

const NOTIFY_HANDLERS = createNotifyHandlers(TERMS_CONFIG);

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => (
  <button className="w-full max-w-md rounded-xl bg-red-600 hover:bg-red-500 p-4 transition-all duration-200 ease-out">
    <div className="flex justify-between items-center">
      <p className="text-white font-semibold text-sm md:text-base lg:text-lg text-left flex-grow break-words">
        {text}
      </p>
      <img
        src="/images/flecha.png"
        alt="ícono flecha"
        className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 ml-2"
      />
    </div>
  </button>
);

interface ButtonLinkProps extends ButtonProps {
  href: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, text }) => (
  <Link href={href} passHref legacyBehavior>
    <a className="block w-full max-w-md">
      <Button text={text} />
    </a>
  </Link>
);

const PagePendulum: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-between p-6 bg-[#f8f8f8] min-h-screen">
      <div className="w-full max-w-2xl xl:max-w-3xl flex flex-col items-center py-8">
        <div className="w-2/3 bg-[#D9D9D9] rounded-3xl flex flex-col items-center p-6 space-y-6 md:p-8 md:space-y-8">

          <h1 className="text-2xl md:text-3xl font-bold text-center px-4">
            Oscilaciones mecánicas
          </h1>

          <div className=" w-2/3 text-sm md:text-base leading-relaxed text-center px-2">
            <p className="mb-3 text-sm md:text-base leading-relaxed">
              En física, se llama movimiento oscilatorio mecánico a todo cambio de posición que posee una{" "}
              {TERMS_CONFIG.map((term, index) => (
                <React.Fragment key={term.id}>
                  <span
                    className="underline cursor-pointer inline-block hover:text-red-600 transition-colors duration-200"
                    onClick={NOTIFY_HANDLERS[term.id]}
                  >
                    {term.text}
                  </span>
                  {term.separator && index < TERMS_CONFIG.length - 1 && (
                    <span className="inline-block">{term.separator}</span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-red-600 text-center">
            Interacciones
          </h2>

          <div className="w-full flex flex-col justify-center items-center gap-6">
            <ButtonLink
              href="/pendulum"
              text="1. Oscilaciones del péndulo armónico"
            />
            <Button
              text="2. Oscilaciones en el sistema masa resorte"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PagePendulum;