"use client";
import * as THREE from "three";
import { FC, useRef } from "react";
import { useFrame, GroupProps, MeshProps } from "@react-three/fiber";
import { TargetMesh, Trail } from "@react-three/drei";

interface IElectron extends GroupProps {
  speed?: number;
  radius?: number;
  colorPartcicles: THREE.Color
}

export const Electron: FC<IElectron> = ({
  radius = 2.75,
  speed = 6,
  colorPartcicles,
  ...props
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.set(
      Math.sin(t) * radius,
      (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
      0
    );
  });
  return (
    <group {...props}>
      <Trail
        width={5}
        length={6}
        color={new THREE.Color(0.451, 0.451, 0.451)}
        attenuation={(t) => t * t}
      >
        <mesh ref={ref}>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial color={colorPartcicles} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
};
