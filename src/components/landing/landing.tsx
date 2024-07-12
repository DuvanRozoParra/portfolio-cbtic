"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Stars, OrbitControls, Environment } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Atoms, HandsVR, PlaneGrab } from "@/components/landing";
import { Text, Nave } from "@/models/landing";
import { XR, Controllers, VRButton, Hands } from "@react-three/xr";
import { useFaraday } from "@/store";
import { ButtonXR } from "@/components/shared";
import * as THREE from "three";

const arrayXR = [
  {
    text: "Aumentar campo",
    onClick: () => {
      useFaraday.getState().updateData("field", true, [0, 10]);
    },
  },
  {
    text: "Disminuir campo",
    onClick: () => {
      useFaraday.getState().updateData("field", true, [0, 10]);
    },
  },
  {
    text: "Aumentar frecuencia",
    onClick: () => {
      useFaraday.getState().updateData("frecuency", true, [0, 10]);
    },
  },
  {
    text: "Disminuir frecuencia",
    onClick: () => {
      useFaraday.getState().updateData("frecuency", true, [0, 10]);
    },
  },
];

export const Landing = () => {
  return (
    <>
      <VRButton />
      <Canvas shadows camera={{ position: [0,4,10]}}>
        <XR>
          <color attach="background" args={["black"]} />
          <group scale={0.42} position={[0, 2.3, -5]}>
            <Nave />
            <Text position={[0, 2, 19]} />
            <Float
              speed={4}
              rotationIntensity={1}
              floatIntensity={2}
              position={[0, 2, 19]}
            >
              <Atoms position={[-3.7, 0, 0]} scale={0.8} />
            </Float>
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
          {/* <HtmlCanvas height={5} width={5} color="">
            <Inputs
              title="Frecuencia"
              onValue={useFaraday.getState().updateFrecuency}
            />
            <Inputs title="Campo" onValue={useFaraday.getState().updateField} />
          </HtmlCanvas> */}
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
