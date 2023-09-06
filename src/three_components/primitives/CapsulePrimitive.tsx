import { useRef, useEffect } from "react";
import * as THREE from "three";
import { getDefaultMaterialSetting } from "../utils/materialSetting";
import { observer } from "mobx-react";
import storeContainer from "@/store/storeContainer";
import { PrimitiveProps } from "../common/PrimitiveProps";

interface CapsuleParams {
  minRadius: number;
  maxRadius: number;
  radiusUnit: number;
  minLength: number;
  maxLength: number;
  lengthUnit: number;
  minCapSegments: number;
  maxCapSegments: number;
  capSegmentsUnit: number;
  minRadialSegments: number;
  maxRadialSegments: number;
  radialSegments: number;
}

const initCapsule: CapsuleParams = {
  minRadius: 0,
  maxRadius: 30,
  radiusUnit: 0.01,
  minLength: 0,
  maxLength: 30,
  lengthUnit: 0.1,
  minCapSegments: 1,
  maxCapSegments: 32,
  capSegmentsUnit: 1,
  minRadialSegments: 1,
  maxRadialSegments: 64,
  radialSegments: 1,
};

const CapsulePrimitive = observer((props: PrimitiveProps) => {
  const ref = useRef();
  const { primitiveStore } = storeContainer;
  const geometry = new THREE.CapsuleGeometry(0.25, 1, 10, 20);
  const material = getDefaultMaterialSetting();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "CAPSULE";
  mesh.userData["storeID"] = props.storeID;

  useEffect(() => {
    primitiveStore.updatePrimitive(mesh.userData["storeID"], mesh);
  }, []);

  return (
    <primitive
      ref={ref}
      object={
        primitiveStore.meshes[mesh.userData["storeID"]]
          ? primitiveStore.meshes[mesh.userData["storeID"]]
          : mesh
      }
    />
  );
});

export type { CapsuleParams };
export { initCapsule };
export default CapsulePrimitive;