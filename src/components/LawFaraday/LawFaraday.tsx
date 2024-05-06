"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Stars, OrbitControls, Environment } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Atoms, BoxGrab, HandsVR, PlaneGrab } from "@/components/landing";
import { Text, Nave } from "@/models/landing";
import { XR, Controllers, VRButton, Hands } from "@react-three/xr";
import { useFaraday } from "@/store";
import { ButtonXR } from "@/components/shared";
import * as THREE from "three";

import { LawFaradayModel } from "@/models/LawFaraday"

export const LawFaradayPage = () => {
  return (
    <>
      <VRButton />
      <Canvas shadows>
        <XR>
          <color attach="background" args={["black"]} />
          <group scale={0.42} position={[0, 1.8, -5]}>
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
            <LawFaradayModel position={[0,-3.5,11]} rotation={[0,-90 * Math.PI / 180,0]} />
            <Physics
              gravity={[0, -25, 0]}
              iterations={20}
              defaultContactMaterial={{
                friction: 0.1,
              }}
            >
               
              <Hands />
              {/* 
              <HandsVR />
              <BoxGrab position={[0, 0, 15]} /> 
              */}
              <PlaneGrab
                rotation={[(270 * Math.PI) / 180, 0, 0]}
                position={[0, -4.5, 0]}
              />
            </Physics>
          </group>
          <Environment preset="city" blur={1} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
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
