import React from "react";
import { Physics, Debug } from "@react-three/cannon";
import { Canvas, GroupProps } from "@react-three/fiber";
import { Controllers, VRButton, XR } from "@react-three/xr";
import { Environment, Float, OrbitControls, Stars } from "@react-three/drei";
import { Atoms, PlaneGrab } from "@/components/landing";
import { Nave, Text } from "@/models/landing";
import { HandsMap } from "@/components/shared";

type TViewProps = React.RefAttributes<HTMLCanvasElement> & {
  children: React.ReactNode;
  textCbtic?: GroupProps;
  debug?: boolean;
};

export const ViewVR: React.FC<TViewProps> = ({
  children,
  textCbtic,
  debug = false,
  ...props
}) => {
  return (
    <>
      <VRButton />
      <Canvas shadows {...props}>
        <XR>
          <color attach="background" args={["black"]} />
          <group>
            <Nave position={[0, 3.5, -10]} />
            <Text position={[0, 2, -4]} />
            <Float
              speed={4}
              rotationIntensity={1}
              floatIntensity={2}
              position={[0, 2, -4]}
            >
              <Atoms position={[-3.7, 0, 0]} scale={0.8} />
            </Float>
            <Physics
              gravity={[0, -25, 0]}
              iterations={20}
              defaultContactMaterial={{
                friction: 0.1,
              }}
              tolerance={0.001}
            >
              <Debug color={"green"} scale={0.5}>
                {children}
                <HandsMap />
                <PlaneGrab
                  rotation={[(270 * Math.PI) / 180, 0, 0]}
                  position={[0, -0.97, 0]}
                />
              </Debug>
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
