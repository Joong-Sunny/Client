import { useEffect } from "react";
import storeContainer from "../../../stores/storeContainer";
import { useThree, useFrame } from "@react-three/fiber";
import { observer } from "mobx-react-lite";
import * as THREE from "three";
import { renderingContext_store } from "../../../stores/RenderingContext_Store";

const Camera_V = observer((props) => {
  const { common_store } = storeContainer;

  const { gl, camera, scene } = useThree();
  const set = useThree((state) => state.set);
  //setControls

  useEffect(() => {
    camera.position.copy(new THREE.Vector3(0, 0, 0));
    set({
      scene: renderingContext_store.scene,
      camera: renderingContext_store.previewCamera,
    });
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFShadowMap;
    gl.physicallyCorrectLights = true;
    //gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1; //default
    gl.sortObjects = true;
  }, [renderingContext_store.previewCamera]);
  useFrame(() => {
    if (!common_store.isPreview) {
      common_store.transcontrol.visible = false;
      // common_store.transcontrol.showZ = false;
    }
  });
  return <></>;
});

export default Camera_V;
