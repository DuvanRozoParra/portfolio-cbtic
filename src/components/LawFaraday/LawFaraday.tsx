"use client";

import { Iman, Aspire, FieldAspire } from "@/models/LawFaraday";
import { g } from "math";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { Slider } from "@ui/slider";
import { useMove } from "@store";
import { PATH_LAW_FARADAY } from "@/config";

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

useGLTF.preload(PATH_LAW_FARADAY + "/iman-transformed.glb");
useGLTF.preload(PATH_LAW_FARADAY + "/fieldAspire-transformed.glb");
useGLTF.preload(PATH_LAW_FARADAY + "/aspire-transformed.glb");
