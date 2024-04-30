import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

const repeatTextures = (textures: THREE.Texture[], size: number) => {
  textures.forEach((t) => {
    if (t){
        t.repeat.set(size, size);
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;
        t.needsUpdate = true;
    }
  });
};

export const useMaterials = (
  url: string,
  name: string,
  size: number,
  isMetalness: boolean,
  rest?: Record<string,any>
) => {
  const urlTexture = url + name + "-JPG_";

  const arrayMap = [
    urlTexture + "Color.jpg",
    urlTexture + "Displacement.jpg",
    urlTexture + "NormalDX.jpg",
    urlTexture + "Roughness.jpg",
  ];

  if (isMetalness) arrayMap.push(urlTexture + "Metalness.jpg");

  // [colorMap, dispMap, normMap, roughMap, metalMap]
  const textures = useTexture(arrayMap);
  repeatTextures(textures, size);

  let objectmaterial: Record<string,any> = {
    side: THREE.DoubleSide,
    aoMap: textures[0],
    map: textures[0],
    displacementMap: textures[1],
    normalMap: textures[2],
    roughnessMap: textures[3],
    displacementScale: 0,
    roughness: 1
  }

  if (isMetalness) {
    objectmaterial.metalnessMap = textures[4];
    objectmaterial.metalness = 3;
  }

  if (rest) objectmaterial = { ...objectmaterial, ... rest }

  console.log("🚀 ~ objectmaterial:", objectmaterial)
  return new THREE.MeshPhysicalMaterial({
    ...objectmaterial
  });
};
/*
map: urlTexture + "Color.jpg",
displacementMap: urlTexture + "Displacement.jpg",
normalMap: urlTexture + "NormalDX.jpg",
roughnessMap: urlTexture + "Roughness.jpg",
metalnessMap: urlTexture + "Metalness.jpg"
*/
