import { scene_store } from "../../stores/Scene_Store";
import { action, runInAction } from "mobx";
import UUIDGenerator from "../../../utils/uuid";
import { hsvaToHex } from "@uiw/color-convert";
const ambientLightViewModel = {
  //set Intensity
  get alIntensity() {
    return scene_store.alIntensity;
  },
  setAlIntensity: action((value) => {
    scene_store.alIntensity = value;
  }),
  // ambient light toggle
  get alToggle() {
    return scene_store.alToggle;
  },
  // ambient light color
  get alColor() {
    return scene_store.alColor;
  },
  setAlColor: action((value) => {
    runInAction(() => {
      scene_store.alColor = value;
    });
  }),
  toJson() {
    return {
      name: "AmbientLight",
      objectId: UUIDGenerator.run(),
      type: "Light",
      props: {
        lightType: "AmbientLight",
        visible: scene_store.alToggle,
        color: hsvaToHex(scene_store.alColor),
        intensity: scene_store.alIntensity,
      },
    };
  },
};

export default ambientLightViewModel;
