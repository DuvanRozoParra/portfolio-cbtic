"use client";

import { BoxProps, PlaneProps, useBox, usePlane } from "@react-three/cannon";
import React, { MutableRefObject } from "react";
import * as THREE from "three";

export const PlaneGrab = (props: PlaneProps) => {
  const [ref] = usePlane(() => ({ type: "Static",...props }));
  return (
    <mesh ref={ref as MutableRefObject<THREE.Mesh>}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
};
