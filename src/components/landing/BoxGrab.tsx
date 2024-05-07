"use client";

import { BoxProps, PlaneProps, useBox, usePlane } from "@react-three/cannon";
import React, { MutableRefObject } from "react";
import * as THREE from "three";

export const BoxGrab = (props: BoxProps) => {
  const [ref] = useBox(() => ({ mass: 1, ...props }));
  return (
    <mesh ref={ref as MutableRefObject<THREE.Mesh>}>
      <boxGeometry />
    </mesh>
  );
};

export const PlaneGrab = (props: PlaneProps) => {
  const [ref] = usePlane(() => ({ type: "Static", ...props }));
  return (
    <mesh ref={ref as MutableRefObject<THREE.Mesh>} visible={false}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
};
