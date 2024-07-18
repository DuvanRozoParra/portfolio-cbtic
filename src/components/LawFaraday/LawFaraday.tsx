"use client";

import { Iman, Aspire, FieldAspire } from "@/models/LawFaraday";
import { g } from "math";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { Slider } from "@ui/slider";
import { useMove } from "@store";

export const LawFaradayPage = () => {
  const refSlider = useRef<number>(0);

  return (
    <>
      <Canvas shadows>
        <group
          scale={0.002}
          position={[0.5, 0.3, 3]}
          rotation={[g(35), g(115), 0]}
        >
          <Iman position={[0, 0, 0.25]} />
          <Aspire />
          <FieldAspire />
        </group>
        {/* <OrbitControls /> */}
        <Environment preset="lobby" blur={1} />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
            intensity={0.4}
          />
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          />
          {/* <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
        </EffectComposer>
      </Canvas>
      <section className="absolute bottom-10 left-1/2 w-[200px] bg-gray-400 h-10 flex items-center justify-center rounded-full px-4">
        <Slider
          onValueChange={(value) => {
            useMove.getState().setX(value[0]);
          }}
          defaultValue={[0]}
          max={200}
          step={1}
          min={1}
          className="w-[200px]"
        />
      </section>
    </>
  );
}; // 2.3,-0.8,0

/*
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
               
              <HandsVR />
              <BoxGrab position={[0, 0, 15]} /> 
              
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
    */
