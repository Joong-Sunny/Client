import storeContainer from "../stores/storeContainer";
import { WebGLRenderer, sRGBEncoding } from "three";
import * as THREE from "three";
import { objectViewModel } from "../view_models/Object_VM";
import { renderingContext_store } from "../stores/RenderingContext_Store";
import { object_store } from "../stores/Object_Store";

export default function CreateVedioImage_VM() {
  const { common_store, scene_store } = storeContainer;

  const capture = async () => {
    const canvas = document.getElementById("canvas").firstChild;
    const canvas2 = canvas.cloneNode();
    const scene = renderingContext_store.scene;

    const renderer = new WebGLRenderer({
      canvas: canvas2,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;
    renderer.toneMappingExposure = 1; //default
    renderer.sortObjects = true;

    const blob = await new Promise((accept, reject) => {
      renderer.setSize(canvas.width, canvas.height);
      renderer.outputEncoding = sRGBEncoding;
      renderer.render(scene, renderingContext_store.camera);
      renderer.domElement.toBlob(accept, "image/png");
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "capture.png";
    link.dispatchEvent(new MouseEvent("click"));
  };

  const screenshot = async () => {
    const screenCamera = new THREE.PerspectiveCamera();
    screenCamera.copy(renderingContext_store.camera);
    screenCamera.lookAt(0, 0, 0);

    const scene = renderingContext_store.scene;
    scene_store.grid.visible = false;
    if (objectViewModel.selectedObjects.length !== 0) {
      common_store.transcontrol.detach();
    }

    renderingContext_store.gl.render(scene, screenCamera);
    const blob = await new Promise((accept, reject) => {
      renderingContext_store.gl.domElement.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          accept(reader.result.split(",")[1]);
        };
        reader.readAsDataURL(blob);
      }, "image/png");
    });

    if (scene_store.grid !== null) scene_store.grid.visible = true;
    if (object_store.selectedObjects.length !== 0) {
      common_store.transcontrol.attach(object_store.selectedObjects[0].mesh);
    }
    return blob;
  };

  return { capture, screenshot };
}
