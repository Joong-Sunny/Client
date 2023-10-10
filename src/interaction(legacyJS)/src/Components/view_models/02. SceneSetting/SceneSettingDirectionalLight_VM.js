import { DirectionalLight } from "three";
import { scene_store } from "../../stores/Scene_Store";
import { action } from "mobx";
import UUIDGenerator from "../../../utils/uuid";
import { hsvaToHex } from "@uiw/color-convert";
const directionalLightViewModel = {
  //set Intensity
  get dlIntensity() {
    return scene_store.dlIntensity;
  },
  setDlIntensity: action((value) => {
    scene_store.dlIntensity = value;
  }),

  // directional light toggle
  get dlToggle() {
    return scene_store.dlToggle;
  },
  setDlToggle() {
    scene_store.dlToggle = !scene_store.dlToggle;
  },

  // directional light color
  get dlColor() {
    return scene_store.dlColor;
  },
  setDlColor: action((hsvaColor) => {
    scene_store.dlColor = hsvaColor;
  }),
  toJson() {
    return {
      name: "DirectionalLight",
      objectId: UUIDGenerator.run(),
      type: "Light",
      props: {
        position: { x: -10, y: 18, z: 11.5 },
        lightType: "DirectionalLight",
        castShadow: true,
        color: hsvaToHex(scene_store.dlColor),
        intensity: scene_store.dlIntensity,
      },
    };
  },
};

export default directionalLightViewModel;
