"use client";

import { useMemo, useRef, useState } from "react";
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
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { Atoms } from "@/components/landing";
import { Text, Nave } from "@/models/landing";
import { Interactive, XR, Controllers, VRButton } from "@react-three/xr";

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial transparent opacity={0}/>
    </mesh>
  );
}

export const Landing = () => {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          <Sky sunPosition={[0, 1, 0]} />
          <Nave/>
          <Environment background preset="city" blur={1}/>
          <Floor />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Float speed={4} rotationIntensity={1} floatIntensity={2} position={[0,2,-4]}>
            <Atoms position={[-3.7, 0, 0]} scale={0.8} />
          </Float>
          <Text position={[0,2,-4]}/>
          <OrbitControls/>
          <Controllers />
        </XR>

        {/* <color attach="background" args={['black']} /> 
      <Stars saturation={0} count={400} speed={0.5} />  */}
      </Canvas>
    </>
  );
};
