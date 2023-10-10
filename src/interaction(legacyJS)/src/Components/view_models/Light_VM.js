import { objectViewModel } from "../view_models/Object_VM";
import { common_store } from "../stores/Common_Store";

const lightViewModel = {
  setLightMeshVisibility(toggle) {
    common_store.lightMeshVisible = toggle;
    for (var objects of objectViewModel.metaObjects) {
      if (objects.hasLight === true) {
        objects.mesh.traverse((child) => {
          if (child.isLineSegments) {
            if (common_store.lightMeshVisible === false) {
              child.material.visible = false;
            } else {
              child.material.visible = true;
            }
          }
        });
      }
      if (objects.type.includes("Camera")) {
        objects.mesh.visible = toggle;
      }
    }
  },
};

export default lightViewModel;
