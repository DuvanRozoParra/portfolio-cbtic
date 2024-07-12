import { useBox, usePlane } from "@react-three/cannon";
import * as THREE from "three";
import React from "react";

const BoxTable = () => {
  const [ref] = useBox(() => ({ type: "Static", position: [0,1,0] }));
  return (
    <mesh ref={ref as React.MutableRefObject<THREE.Mesh>}>
      <boxGeometry />
      <meshStandardMaterial color={new THREE.Color(1, 1, 1)} />
    </mesh>
  );
};

const PlaneTable = (props: any) => {
  const [ref] = usePlane(() => ({ type: "Static", ...props }));
  return (
    <mesh scale={0.02} ref={ref as React.MutableRefObject<THREE.Mesh>}>
      <boxGeometry/> 
      <meshStandardMaterial
        color={
          new THREE.Color(
            Math.random(), // componente rojo
            Math.random(), // componente verde
            Math.random() // componente azul
          )
        }
      />
    </mesh>
  ); 
};

export const BoxCollider = () => {
  return (
    <group>
      <BoxTable />
      {/* }
      <PlaneTable args={[0.001]} position={[0, 0, 1]} />
      <PlaneTable />
      <PlaneTable />
      {
      Array.from({ length: 3 }).map((item, index)=>(
        <PlaneTable key={index + "plane"}/>
      ))
    } */}
    </group>
  );
};
