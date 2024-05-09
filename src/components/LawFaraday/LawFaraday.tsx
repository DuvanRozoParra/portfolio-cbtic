"use client";

import { ViewVR } from "@/layout/ViewVR";
import { LawFaradayModel } from "@/models/LawFaraday";
import { CubesDynamic, TableCubesDymanic } from "@/components/shared/objectDynamic";
import * as THREE from "three";
import { useBox } from "@react-three/cannon";

export const LawFaradayPage = () => {
  return (
    <ViewVR>
      <LawFaradayModel
        position={[0, 0.2, -1]}
        rotation={[0, (-90 * Math.PI) / 180, 0]}
        scale={0.48}
      /> 
      <group >
        {Array.from({ length: 6 }).map((item, index) => ( // [0,0.5,2]
          <CubesDynamic key={"cube" + index} position={[0,0.8 + 0.2 * index,1.2]}  />
        ))}
      </group>
      <TableCubesDymanic/>
    </ViewVR>
  );
};// 2.3,-0.8,0

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
