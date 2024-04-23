"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Trail,
  Float,
  Line,
  Sphere,
  Stars,
  OrbitControls,
  Sky,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { Atoms } from "@/components/landing";
import { Text } from "@/models/landing";
import { Interactive, XR, Controllers, VRButton } from "@react-three/xr";

export const Landing = () => {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <Atoms position={[-3.7, 0, 0]} scale={0.8} />
          </Float>
          <Text />
          <EffectComposer>
            <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
          </EffectComposer>
          <Sky sunPosition={[0, 1, 0]} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial color="#666" />
          </mesh>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Controllers />
        </XR>

        {/* <color attach="background" args={['black']} /> 
      <Stars saturation={0} count={400} speed={0.5} />  */}
      </Canvas>
    </>
  );
};
