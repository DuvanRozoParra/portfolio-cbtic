import React from "react";
import { useBox } from "@react-three/cannon";
import { MeshProps } from "@react-three/fiber";
import * as THREE from "three";

type TCubesProps = MeshProps;

export const CubesDynamic = ({ ...props }) => {
  const [ref] = useBox(() => ({
    args: [0.1, 0.1, 0.1],
    mass: 1,
    ...props,
  }));

  return (
    <mesh ref={ref as React.MutableRefObject<THREE.Mesh>}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshStandardMaterial
        color={
          new THREE.Color(
            Math.random(), // componente rojo
            Math.random(), // componente verde
            Math.random() // componente azul
          )
        }
      />
    </mesh>
  );
};

export const TableCubesDymanic = () => {
  const [ref] = useBox(() => ({
    type: "Static",
    args: [3, 3, 0.2],
    rotation: [(90 * Math.PI) / 180, 0, 0],
    position: [0,0.5,1.2],
  }));
  return (
    <group>
      <mesh ref={ref as React.MutableRefObject<THREE.Mesh>}>
        <boxGeometry args={[1.5, 1.5, 0.24]} />
        <meshStandardMaterial
          color={new THREE.Color(Math.random(), Math.random(), Math.random())}
        />
      </mesh>
    </group>
  );
};
