import { action } from "mobx";
import { common_store } from "../stores/Common_Store";
import { object_store } from "../stores/Object_Store";
import { objectViewModel } from "./Object_VM";
import * as THREE from "three";
import { renderingContext_store } from "../stores/RenderingContext_Store";
const ObjectControllerVM = {
  Select: action((object) => {
    common_store.transcontrol.detach(); //transcontrol 해제
    if (common_store.isCtrl) {
      if (objectViewModel.IsSelectedByUUID(object.objectId)) {
        //이미 선택되어있는 걸 선택했을때...

        ObjectControllerVM.DeSelect(object.objectId);
      } else {
        //새로운 object 선택
        object_store.selectedObjects = [
          ...object_store.selectedObjects,
          object,
        ];
      }
    } else {
      //단일 선택
      object_store.selectedObjects = [object];
    }

    ObjectControllerVM.AttachTranscontrolToSelectedObject();
    if (object.type === "Audio") {
      common_store.transcontrol.detach();
    }
  }),
  CtrlSelect: action((object) => {
    common_store.transcontrol.detach(); //transcontrol 해제
    if (common_store.isCtrl) {
      //새로운 object 선택
      object_store.selectedObjects = [...object_store.selectedObjects, object];
    } else {
      //단일 선택
      object_store.selectedObjects = [object];
    }
    ObjectControllerVM.AttachTranscontrolToSelectedObject();
  }),
  ShiftSelect: action((object) => {
    common_store.transcontrol.detach(); //transcontrol 해제

    if (objectViewModel.IsSelectedByUUID(object.objectId)) {
      //이미 선택되어있는 걸 선택했을때...
      ObjectControllerVM.DeSelect(object.objectId);
    } else {
      //새로운 object 선택
      object_store.selectedObjects = [...object_store.selectedObjects, object];
    }
    ObjectControllerVM.AttachTranscontrolToSelectedObject();
  }),
  DeSelect: action((objectId) => {
    common_store.transcontrol.detach(); //transcontrol 해제
    const index = objectViewModel.FindIdxSelectedObjectByUUID(objectId);

    object_store.selectedObjects.splice(index, 1);
    object_store.selectedObjects = [...object_store.selectedObjects];
    ObjectControllerVM.AttachTranscontrolToSelectedObject();
  }),
  DeSelectAll: action(() => {
    common_store.transcontrol.detach();
    object_store.selectedObjects = [];
    ObjectControllerVM.AttachTranscontrolToSelectedObject();
    // console.log(renderingContext_store.scene)
    //console.log("DESELECTALL")
  }),
  AttachTranscontrolToSelectedObject: action(() => {
    for (const child of renderingContext_store.scene.children) {
      if (child.name === "MultiSelect") {
        while (child.children.length > 0) {
          const targetmesh = child.children[0];
          const worldPosition = new THREE.Vector3();
          const worldScale = child.scale;
          const worldRotation = child.rotation;
          targetmesh.getWorldPosition(worldPosition);
          renderingContext_store.scene.add(targetmesh);
          targetmesh.position.x = worldPosition.x;
          targetmesh.position.y = worldPosition.y;
          targetmesh.position.z = worldPosition.z;

          targetmesh.scale.x *= worldScale.x;
          targetmesh.scale.y *= worldScale.y;
          targetmesh.scale.z *= worldScale.z;

          targetmesh.rotation.x += worldRotation.x;
          targetmesh.rotation.y += worldRotation.y;
          targetmesh.rotation.z += worldRotation.z;
        }
        renderingContext_store.scene.remove(child);
      }
    }

    if (object_store.selectedObjects.length === 1) {
      //trancotrol attach
      common_store.transcontrol.detach();
      const len = object_store.selectedObjects.length;
      const mesh = object_store.selectedObjects[len - 1].mesh;

      common_store.transcontrol.attach(mesh);
    }
    if (object_store.selectedObjects.length > 1) {
      common_store.transcontrol.detach();

      const group = new THREE.Object3D();
      group.name = "MultiSelect";
      const selectedObjectCount = object_store.selectedObjects.length;

      for (const metaObject of object_store.selectedObjects) {
        const worldPosition = new THREE.Vector3();
        metaObject.mesh.getWorldPosition(worldPosition);
        group.position.x += worldPosition.x;
        group.position.y += worldPosition.y;
        group.position.z += worldPosition.z;
      }

      group.position.x /= selectedObjectCount;
      group.position.y /= selectedObjectCount;
      group.position.z /= selectedObjectCount;

      for (const metaObject of object_store.selectedObjects)
        group.attach(metaObject.mesh);

      for (const child of group.children) child.visible = true;

      renderingContext_store.scene.add(group);
      common_store.transcontrol.attach(group);
    }
  }),
  Lock: action((object) => {
    for (const child of renderingContext_store.scene.children) {
      if (child.name === "MultiSelect") {
        while (child.children.length > 0) {
          const targetmesh = child.children[0];
          const worldPosition = new THREE.Vector3();
          const worldScale = child.scale;
          const worldRotation = child.rotation;
          targetmesh.getWorldPosition(worldPosition);
          renderingContext_store.scene.add(targetmesh);
          targetmesh.position.x = worldPosition.x;
          targetmesh.position.y = worldPosition.y;
          targetmesh.position.z = worldPosition.z;

          targetmesh.scale.x *= worldScale.x;
          targetmesh.scale.y *= worldScale.y;
          targetmesh.scale.z *= worldScale.z;

          targetmesh.rotation.x += worldRotation.x;
          targetmesh.rotation.y += worldRotation.y;
          targetmesh.rotation.z += worldRotation.z;
        }
        renderingContext_store.scene.remove(child);
      }
      common_store.transcontrol.detach();
    }

    object.SetProps("lock", !object.props["lock"]);

    if (object.props["lock"]) {
      common_store.transcontrol.detach();
    } else if (
      object.props["visible"] &&
      objectViewModel.IsSelectedByUUID(object.objectId)
    ) {
      common_store.transcontrol.attach(object.mesh);
    }
  }),

  Hide: action((object) => {
    for (const child of renderingContext_store.scene.children) {
      if (child.name === "MultiSelect") {
        while (child.children.length > 0) {
          const targetmesh = child.children[0];
          const worldPosition = new THREE.Vector3();
          const worldScale = child.scale;
          const worldRotation = child.rotation;
          targetmesh.getWorldPosition(worldPosition);
          renderingContext_store.scene.add(targetmesh);
          targetmesh.position.x = worldPosition.x;
          targetmesh.position.y = worldPosition.y;
          targetmesh.position.z = worldPosition.z;

          targetmesh.scale.x *= worldScale.x;
          targetmesh.scale.y *= worldScale.y;
          targetmesh.scale.z *= worldScale.z;

          targetmesh.rotation.x += worldRotation.x;
          targetmesh.rotation.y += worldRotation.y;
          targetmesh.rotation.z += worldRotation.z;
        }
        renderingContext_store.scene.remove(child);
      }
    }

    object.SetProps("visible", !object.props["visible"]);
    if (!object.props["visible"]) {
      common_store.transcontrol.detach();
      console.log("deta");
    } else common_store.transcontrol.attach(object.mesh);
  }),
};
export { ObjectControllerVM };
