"use client";

import { createRoot } from "react-dom/client";

import React, { useState, useEffect, Fragment } from "react";
import { Hands, VRButton, XR, RayGrab } from "@react-three/xr";
import { useThree, useFrame, Canvas } from "@react-three/fiber";
import {
  Box,
  OrbitControls,
  Plane,
  Sphere,
  Sky,
  useMatcapTexture,
} from "@react-three/drei";
import { usePlane, useBox, Physics, useSphere } from "@react-three/cannon";
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

const JointCollider = ({ index, hand }: { index: number; hand: number }) => {
  const { gl } = useThree();
  const handObj = (gl.xr as any).getHand(hand);
  const joint = handObj.joints[joints[index]] as any;
  let size = 0.00001;

  if (joint && "jointRadius" in joint) {
    size = joint.jointRadius;
  }

  const [tipRef, api] = useSphere(() => ({
    args: [size],
    position: [-1,0,0],
  })); // args: size,
  useFrame(() => {
    if (joint === undefined) return;
    api.position.set(joint.position.x, joint.position.y, joint.position.z);
  });

  return (
    <Sphere ref={tipRef as React.MutableRefObject<THREE.Mesh>} args={[size]}>
      <meshBasicMaterial
        // transparent
        // opacity={0}
        color={new THREE.Color(1, 1, 1)}
        attach="material"
      />
    </Sphere>
  );
}

const HandsReady = (props: any) => {
  const [ready, setReady] = useState(false);
  const { gl } = useThree();
  useEffect(() => {
    if (ready) return;
    const joint = (gl.xr as any).getHand(0).joints["index-finger-tip"];
    if (joint?.jointRadius !== undefined) return;
    const id = setInterval(() => {
      const joint = (gl.xr as any).getHand(0).joints["index-finger-tip"];
      if (joint?.jointRadius !== undefined) {
        setReady(true);
      }
    }, 500);
    return () => clearInterval(id);
  }, [gl, ready]);

  return ready ? props.children : null;
}

const HandsColliders = (): any =>
  [...Array(25)].map((_, i) => (
    <Fragment key={i}>
      <JointCollider index={i} hand={0} />
      <JointCollider index={i} hand={1} />
    </Fragment>
  ));

export const HandsMap = () => {
  return (
    <>
      <Hands />
      <HandsReady>
        <HandsColliders />
      </HandsReady>
    </>
  );
}
