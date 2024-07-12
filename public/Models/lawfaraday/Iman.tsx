/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 iman.glb -t -i -I -T -f -S 
Files: iman.glb [9.44MB] > D:\Duvan\portfolio-cbtic\public\Models\lawfaraday\iman-transformed.glb [47.6KB] (99%)
*/

import * as THREE from "three";
import React, { useRef, useMemo, useContext, createContext } from "react";
import { useGLTF, Merged } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { PATH_LAW_FARADAY } from "@/index";

type GLTFResult = GLTF & {
  nodes: {
    IMANC: THREE.Mesh;
    FIELD_IMAN: THREE.Mesh;
  };
  materials: {
    NORTE: THREE.MeshStandardMaterial;
    Emission: THREE.MeshStandardMaterial;
  };
  //animations: GLTFAction[]
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

const context = createContext({} as ContextType);
export function Instances({
  children,
  ...props
}: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF(
    PATH_LAW_FARADAY + "/iman-transformed.glb",
  ) as GLTFResult;
  const instances = useMemo(
    () => ({
      IMANC: nodes.IMANC,
      FIELDIMAN: nodes.FIELD_IMAN,
    }),
    [nodes],
  );
  return (
    <Merged meshes={instances} {...props}>
      {(instances: ContextType) => (
        <context.Provider value={instances} children={children} />
      )}
    </Merged>
  );
}

export function Model(props: JSX.IntrinsicElements["group"]) {
  const instances = useContext(context);
  return (
    <group {...props} dispose={null}>
      <instances.IMANC rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 1.997]} />
      <instances.FIELDIMAN
        position={[0, 0.344, -6.163]}
        rotation={[-2.152, 0, 0]}
        scale={0.113}
      />
    </group>
  );
}

useGLTF.preload(PATH_LAW_FARADAY + "/iman-transformed.glb");