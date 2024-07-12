import { useBox } from "@react-three/cannon";
import { Text } from "@react-three/drei";
import { Interactive } from "@react-three/xr";
import React, { MutableRefObject, Suspense } from "react";
import * as THREE from "three";

type TButtonXR = {
  text: string;
  onClick: any;
  position: THREE.Vector3;
};

export const ButtonXR: React.FC<TButtonXR> = ({ text, onClick, position }) => {
  const [ref] = useBox(() => ({ mass: 1 }));
  return (
    <Interactive
    //  onSelect={() => {
    //    onClick();
    //  }}
    >
      <mesh
        ref={ref as MutableRefObject<THREE.Mesh>}
        scale={[2, 1, 1]}
        position={position}
      >
        <boxGeometry />
        <meshStandardMaterial color={(Math.random() * 0xffffff) | 0} />
        <Suspense>
          <Text
            isMesh
            isObject3D
            position={[0, 0, 0.06]}
            fontSize={0.05}
            color={new THREE.Color(0, 0, 0)}
            anchorX="center"
            anchorY="middle"
          >
            asdasd
            {text}
          </Text>
        </Suspense>
      </mesh>
    </Interactive>
  );
};
