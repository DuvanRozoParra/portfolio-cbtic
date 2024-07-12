"use client";
import React, { FC, useMemo } from "react";
import { Electron } from "@/components/landing";
import * as THREE from "three";
import { Sphere } from "@react-three/drei";
import { useFrame, GroupProps } from "@react-three/fiber";

interface IAtomProps extends GroupProps {
  // Puedes agregar propiedades específicas de un átomo si las necesitas
}

export const Atoms: FC<IAtomProps> = ({ ...props }) => {
  return (
    <group {...props}>
      <Electron colorPartcicles={new THREE.Color(0, 0.745, 0.902)} position={[0, 0, 0.5]} speed={6} />
       <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, Math.PI / 3]}
        speed={6.5}
        colorPartcicles={new THREE.Color(0.612, 0, 0.612)}
      />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, -Math.PI / 3]}
        speed={7}
        colorPartcicles={new THREE.Color(0.98, 0.808, 0.11)}
      />
      <Sphere args={[0.55, 64, 64]}>
        <meshBasicMaterial color={new THREE.Color(0.58, 0, 0.275)} toneMapped={false} />
      </Sphere>
    </group>
  );
};
