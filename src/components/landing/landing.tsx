"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Trail,
  Float,
  Line,
  Sphere,
  Stars,
  OrbitControls,
  Sky,
  Environment,
  Box,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Atoms } from "@/components/landing";
import { Text, Nave } from "@/models/landing";
import {
  Interactive,
  XR,
  Controllers,
  VRButton,
  Hands,
  RayGrab,
} from "@react-three/xr";

export const Landing = () => {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          {/* <Sky sunPosition={[0, 1, 0]} /> */}
          <color attach="background" args={["black"]} />
          <group scale={0.5} position={[0, 1, -5]}>
            <Nave />
            <Text position={[0, 2, -4]} />
            <Float
              speed={4}
              rotationIntensity={1}
              floatIntensity={2}
              position={[0, 2, -4]}
            >
              <Atoms position={[-3.7, 0, 0]} scale={0.8} />
            </Float>
            <RayGrab>
              <Box />
            </RayGrab>
          </group>
          <Environment preset="city" blur={1} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Hands />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <OrbitControls />
          <Controllers />
        </XR>
      </Canvas>
    </>
  );
};
