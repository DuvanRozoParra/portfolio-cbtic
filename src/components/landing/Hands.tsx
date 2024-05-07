"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { SphereArgs, useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { Fragment, MutableRefObject, useEffect, useState } from "react";
import * as THREE from "three";

const joints = [
  "wrist",
  "thumb-metacarpal",
  "thumb-phalanx-proximal",
  "thumb-phalanx-distal",
  "thumb-tip",
  "index-finger-metacarpal",
  "index-finger-phalanx-proximal",
  "index-finger-phalanx-intermediate",
  "index-finger-phalanx-distal",
  "index-finger-tip",
  "middle-finger-metacarpal",
  "middle-finger-phalanx-proximal",
  "middle-finger-phalanx-intermediate",
  "middle-finger-phalanx-distal",
  "middle-finger-tip",
  "ring-finger-metacarpal",
  "ring-finger-phalanx-proximal",
  "ring-finger-phalanx-intermediate",
  "ring-finger-phalanx-distal",
  "ring-finger-tip",
  "pinky-finger-metacarpal",
  "pinky-finger-phalanx-proximal",
  "pinky-finger-phalanx-intermediate",
  "pinky-finger-phalanx-distal",
  "pinky-finger-tip",
];

export function JointCollider({
  index,
  hand,
}: {
  index: number;
  hand: number;
}) {
  const { gl } = useThree();
  const handObj = (gl.xr as any).getHand(hand);
  const joint = handObj.joints[joints[index]] as any;
  let size: SphereArgs = [0.0001];

  if (joint && "jointRadius" in joint) {
    size = joint.jointRadius;
  }

  const [tipRef, api] = useSphere(() => ({ position: [-1, 0, 0] }));

  useFrame(() => {
    // if (joint === undefined) return;
    if (joint){
        api.position.set(joint.position.x, joint.position.y, joint.position.z);
    }
  });

  return (
    <Sphere ref={tipRef as MutableRefObject<THREE.Mesh>} args={[size[0]]}>
      {/* <meshBasicMaterial transparent opacity={0} attach="material" /> */}
      <meshBasicMaterial color="red" attach="material" />
    </Sphere>
  );
}

export const HandsColliders = () => {
  return (
    <>
      {Array.from({ length: 25 }).map((_, index) => (
        <Fragment key={index}>
          <JointCollider index={index} hand={0} />
          <JointCollider index={index} hand={1} /> 
        </Fragment>
      ))}
    </>
  );
};

export function HandsReady(props: any) {
  const [ready, setReady] = useState(false);
  const { gl } = useThree();
  useEffect(() => {
    if (ready) return;

    const joint = gl.xr.getHand(0).joints["index-finger-tip"];

    if (joint?.jointRadius !== undefined) return;

    const id = setInterval(() => {
      const joint = gl.xr.getHand(0).joints["index-finger-tip"];
      if (joint?.jointRadius !== undefined) {
        setReady(true);
      }
    }, 500);
    return () => clearInterval(id);
  }, [gl, ready]);

  return ready ? props.children : null;
}

export const HandsVR = () => {
  return (
    <HandsReady>
      <HandsColliders />
    </HandsReady>
  );
};
