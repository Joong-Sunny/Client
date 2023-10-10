// import { objectViewModel, loadersViewModel } from "../stores/storeContainer";
import * as THREE from "three";
import { loadersViewModel } from "./Loaders_VM";
import MetaObject from "../class/Studio/MetaObject";
import Geometry from "../class/Studio/Geometry";
import MetaPrimitive from "../class/Studio/MetaPrimitivie";
import MetaLight from "../class/Studio/MetaLight";
import MetaCamera from "../class/Studio/MetaCamera";
import { objectViewModel } from "./Object_VM";

/** Rehydrate MetaObject, saved on Json
 * @param {*} metaDatas
 * @returns {<void>}
 */

async function rehydrateObjectInfo(metaDatas) {
  if (typeof metaDatas !== "undefined" && metaDatas !== null) {
    for (const metaData of metaDatas) {
      if (
        !(
          metaData.type === "Light" &&
          (metaData.props["lightType"] === "DirectionalLight" ||
            metaData.props["lightType"] === "AmbientLight")
        )
      ) {
        if (metaData.type === "Group") {
          const geometry = new THREE.BoxGeometry(0, 0, 0);
          const material = new THREE.MeshBasicMaterial({
            color: "rgb(255, 0, 0)",
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.name = "groupBox";
          metaData.geometry = null;
          metaData.geoParams = null;
          material.transparent = true;
          material.opacity = 0.0;

          const tempObject = new MetaObject(
            metaData.objectId,
            metaData.name,
            null,
            null,
            null,
            true,
            metaData.type,
            metaData.groupId
          );
          await tempObject.ReConstructor(mesh, "load", metaData);
        } else if (!metaData.props["geometry"]) {
          const loadUrl = metaData.url.replace(
            process.env.REACT_APP_MINIO_URL,
            ""
          );

          const model = await loadersViewModel.Load("gltf_item", loadUrl);
          model.scene.animations.push(model.animations);
          let tempObject = null;

          if (metaData.type === "PerspectiveCamera") {
            tempObject = new MetaCamera(model.scene, {
              objectId: metaData.objectId,
              name: metaData.name,
              blobGlb: null,
              url: loadUrl,
              loadJSON: true,
              type: metaData.type,
            });
            tempObject.InitClass();
            tempObject.ReConstructor("load", metaData);
          } else if (metaData.props["lightType"]) {
            tempObject = new MetaLight(model.scene, {
              objectId: metaData.objectId,
              name: metaData.name,
              blobGlb: null,
              url: loadUrl,
              loadJSON: true,
              type: metaData.type,
            });
            tempObject.InitClass();
            await tempObject.ReConstructor("load", metaData);
          } else {
            tempObject = new MetaObject(model.scene, {
              objectId: metaData.objectId,
              name: metaData.name,
              blobGlb: null,
              url: loadUrl,
              loadJSON: true,
              materialIndicesMapping: metaData.materialIndicesMapping,
              type: metaData.type,
            });
            tempObject.InitClass(metaData);
            await tempObject.ReConstructor("load", metaData, metaData.children);
          }
          if (metaData.prefabId) {
            tempObject.prefabId = metaData.prefabId;
          }

          objectViewModel.AddRenderObject(tempObject);
        } else {
          const object = new Geometry(metaData.props["geometry"]);
          const tempObject = new MetaPrimitive(object, {
            objectId: metaData.objectId,
            name: metaData.name,
            blobGlb: null,
            url: null,
            loadJSON: true,
            materialIndicesMapping: metaData.materialIndicesMapping,
            type: "Object",
          });
          if (metaData.prefabId) {
            tempObject.prefabId = metaData.prefabId;
          }
          tempObject.InitClass();
          await tempObject.ReConstructor("load", metaData, null);
          objectViewModel.AddRenderObject(tempObject);
        }
      }
    }
  }
}

export default rehydrateObjectInfo;
