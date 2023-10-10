import { objectViewModel } from "./Object_VM";
import { eventSystem_store } from "../stores/Interaction_Stores";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { common_store } from "../stores/Common_Store";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import * as THREE from "three";
import { scene_store } from "../stores/Scene_Store";
import { component_store } from "../stores/Component_Store";
import { Material_store } from "../stores/Material_Store";
import {
  ambientLightViewModel,
  directionalLightViewModel,
} from "./02. SceneSetting/SceneSetting_VM";
import { hsvaToHex } from "@uiw/color-convert";
import EditableScene_VM from "./07. Editable/EditableScene_VM";
import EditableInteraction_VM from "./07. Editable/EditableInteraction_VM";

const exportGlbViewModel = {
  get name() {
    return component_store.name;
  },
  get jsonData() {
    return component_store.jsonData;
  },
  get url() {
    return component_store.url;
  },
  get metaFiles() {
    return component_store.metaFiles;
  },
  get personalFilePath() {
    return component_store.personalFilePath;
  },
  get metaGroups() {
    return component_store.metaGroups;
  },
  get itemDesk() {
    return component_store.itemDesk;
  },
  get metaGroupsPos() {
    return component_store.metaGroupsPos;
  },
  get componentName() {
    return component_store.componentName;
  },
  get saveMode() {
    return component_store.saveMode;
  },

  async exportJSON() {
    const eventSystem_store_json = eventSystem_store.toJSON();
    const metaObjects = [];

    for (const metaObject of objectViewModel.renderObjects) {
      if (metaObject.editMesh === false) {
        const metaJson = await metaObject.toJson("save");
        metaObjects.push(metaJson);
      }
      if (metaObject.editMesh === true) {
        await exportGlbViewModel.exportEditGLB();
        const metaJson = await metaObject.toJson("save");
        metaObjects.push(metaJson);
      }
    }

    metaObjects.push(ambientLightViewModel.toJson());
    metaObjects.push(directionalLightViewModel.toJson());
    const metaMaterials = Material_store.metaMaterials;
    const sceneSettings = {
      backgroundColor: hsvaToHex(scene_store.canvasBackgroundColor),
      renderOption: {
        debugMode: true,
        quality: 1,
      },
      environment: hdriViewModel.toJson(),
      postProcessing: {
        isEnabled: true,
        ssao: ssaoViewModel.toJson(),
        bloom: bloomViewModel.toJson(),
      },
    };
    const sceneSettingInfo = {
      appliedHdriTemplate: scene_store.appliedHdriTemplate,
      hdriToggle: scene_store.hdriToggle,
      hdriBackgroundToggle: scene_store.hdriBackgroundToggle,
      hdriIntensity: scene_store.hdriIntensity,
      hdriYRotation: scene_store.hdriYRotation,
      dlIntensity: scene_store.dlIntensity,
      dlColor: scene_store.dlColor,
      alIntensity: scene_store.alIntensity,
      alColor: scene_store.alColor,
      canvasBackgroundColor: scene_store.canvasBackgroundColor,
      isGridVisible: scene_store.isGridVisible,
      isAxisVisible: scene_store.isAxisVisible,
      canvasBackgroundColorToggle: scene_store.canvasBackgroundColorToggle,

      ssaoToggle: scene_store.SSAOToggle,
      ssaoIntensity: scene_store.SSAOIntensity,
      ssaoSamples: scene_store.SSAOsamples,
      ssaoRings: scene_store.SSAOrings,
      ssaoDistanceThreshold: scene_store.SSAOdistanceThreshold,
      ssaoDistanceFalloff: scene_store.SSAOdistanceFalloff,
      ssaoRangeThreshold: scene_store.SSAOrangeThreshold,
      ssaoRangeFalloff: scene_store.SSAOrangeFalloff,
      ssaoLuminanceInfluence: scene_store.SSAOluminanceInfluence,
      ssaoRadius: scene_store.SSAOradius,
      ssaoScale: scene_store.SSAOscale,
      ssaoBias: scene_store.SSAObias,
      ssaoFade: scene_store.SSAOfade,

      bloomToggle: scene_store.bloomToggle,
      bloomIntensity: scene_store.bloomIntensity,
      bloomLuminanceThreshold: scene_store.bloomLuminanceThreshold,
      bloomLuminanceSmoothing: scene_store.bloomLuminanceSmoothing,
    };

    // Editable Props
    const editableInteraction = EditableInteraction_VM().toJson();
    const editableScene = EditableScene_VM().toJson();

    const jsonData = {
      version: "1.5.0",
      metaObjects: metaObjects,
      metaMaterials: metaMaterials,
      interactionSystem: eventSystem_store_json,
      sceneSettingInfo: sceneSettingInfo,
      sceneSettings: sceneSettings,
      editableInteraction: editableInteraction,
      editableScene: editableScene,
    };
    return jsonData;
  },

  async exportGLB(sel) {
    common_store.transcontrol.detach();
    const exportGroup = new THREE.Group();
    if (sel === 1) {
      for (const object of objectViewModel.selectedObjects) {
        if (object.type === "Object" && !object.haslight) {
          const tempGroup = SkeletonUtils.clone(object.group);
          tempGroup.position.copy(object.group.position.clone());
          tempGroup.rotation.copy(object.group.rotation.clone());
          tempGroup.scale.copy(object.group.scale.clone());
          await exportGroup.add(tempGroup);
        }
      }
    } else if (sel === 2) {
      for (const object of objectViewModel.metaObjects) {
        if (object.type === "Object" && !object.haslight) {
          const tempGroup = SkeletonUtils.clone(object.group);
          tempGroup.position.copy(object.group.position.clone());
          tempGroup.rotation.copy(object.group.rotation.clone());
          tempGroup.scale.copy(object.group.scale.clone());
          await exportGroup.add(tempGroup);
        }
      }
    }

    const options = {
      binary: true,
    };
    const gltfexporter = new GLTFExporter();

    // Promise로 GLB 로드
    const blob = await new Promise((resolve) => {
      gltfexporter.parse(
        exportGroup,
        function (result) {
          if (result instanceof ArrayBuffer) {
            const blob = new Blob([result], {
              type: "application/octet-stream",
            });
            resolve(blob);
          }
        },
        options
      );
    });

    // create URL for the Blob
    const url = URL.createObjectURL(blob);
    const fileName = prompt("파일 이름을 입력하세요.", "File name");
    if (!exportGlbViewModel.checkFileName(fileName)) {
      alert("유효한 파일 이름이 아닙니다!");
      return;
    }
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName + ".glb";
    // link.download = "MXScene.glb";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // revoke URL to release memory
    URL.revokeObjectURL(url);
  },

  checkFileName(fileName) {
    if (/^\.+$/.test(fileName)) {
      return false;
    }

    var pattern = /^[a-zA-Z0-9_\-. ]+$/;

    if (!pattern.test(fileName)) {
      return false;
    }

    var reservedNames = ["con", "prn", "aux", "nul"];
    var reservedNamesPattern = new RegExp(
      "^(" + reservedNames.join("|") + ")$",
      "i"
    );
    if (reservedNamesPattern.test(fileName)) {
      return false;
    }
    var reservedCharacters = /[/:*?"<>|]/;
    if (reservedCharacters.test(fileName)) {
      return false;
    }
    if (/\.\./.test(fileName)) {
      return false;
    }

    if (fileName.length > 255) {
      return false;
    }

    return true;
  },

  async exportEditGLB() {
    for (const object of objectViewModel.metaObjects) {
      if (
        object.type === "Object" &&
        !object.haslight &&
        object.editMesh === true
      ) {
        const tempGroup = object.group;

        const options = {
          binary: true,
        };
        const gltfexporter = new GLTFExporter();

        // Promise로 GLB 로드
        const blob = await new Promise((resolve) => {
          gltfexporter.parse(
            tempGroup,
            function (result) {
              if (result instanceof ArrayBuffer) {
                const blob = new Blob([result], {
                  type: "application/octet-stream",
                });
                resolve(blob);
              }
            },
            options
          );
        });
        console.log(blob);
        object.blobGlb = blob;
      }
    }
  },

  save(blob, filename) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  },
};

export { exportGlbViewModel };
