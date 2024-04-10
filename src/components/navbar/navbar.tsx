"use client";

import React, { useState } from "react";
import { motion, useAnimate } from "framer-motion";
import Link from "next/link";
import { useWindows } from "@/hooks";
import { ButtonNavbar } from "@/components/navbar";

const ItemsLinks = [
  {
    title: "Profesores",
    url: "/teachers",
  },
  {
    title: "Asignaturas",
    url: "/courses",
  },
  {
    title: "Asesorias",
    url: "/consultancies",
  },
  {
    title: "Eventos",
    url: "/events",
  },
  {
    title: "Quienes Somos?",
    url: "/about",
  },
];

const VarianstLinks = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const variantsUL = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navbar = () => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const [scope, animate] = useAnimate();
  const windowsW = useWindows();
  return (
    <motion.nav
      className={`${
        windowsW <= 750
          ? "px-py flex-col"
          : "px-3 py-2 flex-row items-center h-12"
      } border-b-4 border-red-500 flex justify-center w-svw overflow-hidden`}
      initial={false}
      animate={windowsW <= 750 ? (isOpen ? "open" : "closed") : "open"}
    >
      <div className="flex flex-row w-1/2 items-center">
        {windowsW <= 750 && (
          <ButtonNavbar
            className="py-px"
            onClick={() => {
              toggleOpen((state) => {
                if (!state)
                  animate(scope.current, {
                    opacity: 1,
                    height: "auto",
                    padding: "12px 5px",
                  });
                else
                  animate(scope.current, {
                    opacity: 1,
                    height: 0,
                    padding: "0px 0px",
                  });
                return !state;
              });
            }}
          />
        )}
        LOGO
      </div>
      <motion.ul
        ref={scope}
        variants={variantsUL}
        className={`flex ${
          windowsW <= 750
            ? "flex-col h-0 opacity-0 rounded-md px-3"
            : "flex-row items-center justify-center h-full space-x-3"
        } font-bold w-full`}
      >
        {ItemsLinks.map((item) => (
          <motion.li
            key={item.title}
            className={`${
              windowsW <= 750 ? "py-3" : ""
            } hover:bg-red-500 hover:text-white hover:rounded-md px-1`}
            variants={VarianstLinks}
          >
            <Link href={item.url} title={item.title}>
              {item.title}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};
