import storeContainer from "../../stores/storeContainer";
import { gridViewModel } from "./SceneSettingDisplay_VM";
import { hexToHsva } from "@uiw/color-convert";
import {controllerBar_store} from "../../stores/ControllerBar_Store";

export default function UndoSceneSetting_VM() {
  const { scene_store, common_store } = storeContainer;

  function sceneSettingUndo(target, data) {
    switch (data.mode) {
      case "HdriLightInfoToggle":
        scene_store.hdriToggle = !scene_store.hdriToggle;
        break;
      case "HdriBackgroundToggle":
        scene_store.hdriBackgroundToggle = !scene_store.hdriBackgroundToggle;
        break;
      case "HdriTemplate":
        scene_store.appliedHdriTemplate = data.prevValue;
        break;
      case "HdriIntensity":
        scene_store.hdriIntensity = data.prevValue;
        break;
      case "HdriYRotation":
        scene_store.hdriYRotation = data.prevValue;
        break;
      case "AlIntensity":
        scene_store.alIntensity = data.prevValue;
        break;
      case "AlColor":
        scene_store.alColor = hexToHsva(data.prevValue);
        break;
      case "DlIntensity":
        scene_store.dlIntensity = data.prevValue;
        break;
      case "DlColor":
        scene_store.dlColor = hexToHsva(data.prevValue);
        break;
      case "CanvasBackgroundColor":
        scene_store.canvasBackgroundColor = hexToHsva(data.prevValue);
        break;
      case "Grid":
        gridViewModel.toggleGrid();
        break;
      case "Axis":
        gridViewModel.toggleAxis();
        break;
      case "CanvasBackgroundColorToggle":
        scene_store.canvasBackgroundColorToggle = !scene_store.canvasBackgroundColorToggle;
        break;
      case "MagneticMode":
        controllerBar_store.magneticMode = !controllerBar_store.magneticMode;
        break;
      case "RotationSnapMode":
        controllerBar_store.setRotationSnapMode(!controllerBar_store.rotationSnapMode);
        break;
      case "GizmoStatus":
        controllerBar_store.gizmoStatus = data.prevValue
        console.log(data.prevValue)
        common_store.transcontrol.setaxisType(data.prevValue);
        common_store.transcontrol.setSpace(data.prevValue);
        break;
      case "AttachMode":
        controllerBar_store.attachMode = !controllerBar_store.attachMode;
        break;
      case "NormalMode":
        controllerBar_store.normalMode = !controllerBar_store.normalMode;
        break;
      default:
        break;
    }
  }

  function sceneSettingRedo(target, data) {
    switch (data.mode) {
      case "HdriLightInfoToggle":
        scene_store.hdriToggle = !scene_store.hdriToggle;
        break;
      case "HdriBackgroundToggle":
        scene_store.hdriBackgroundToggle = !scene_store.hdriBackgroundToggle;
        break;
      case "HdriToggle":
        scene_store.hdriToggle = !scene_store.hdriToggle;
        break;
      case "HdriTemplate":
        scene_store.appliedHdriTemplate = data.curValue;
        break;
      case "HdriIntensity":
        scene_store.hdriIntensity = data.curValue;
        break;
      case "HdriYRotation":
        scene_store.hdriYRotation = data.curValue;
        break;
      case "AlIntensity":
        scene_store.alIntensity = data.curValue;
        break;
      case "AlColor":
        scene_store.alColor = hexToHsva(data.curValue);
        break;
      case "DlIntensity":
        scene_store.dlIntensity = data.curValue;
        break;
      case "DlColor":
        scene_store.dlColor = hexToHsva(data.curValue);
        break;
      case "CanvasBackgroundColor":
        scene_store.canvasBackgroundColor = hexToHsva(data.curValue);
        break;
      case "Grid":
        gridViewModel.toggleGrid();
        break;
      case "Axis":
        gridViewModel.toggleAxis();
        break;
      case "CanvasBackgroundColorToggle":
        scene_store.canvasBackgroundColorToggle = !scene_store.canvasBackgroundColorToggle;
        break;
      case "MagneticMode":
        controllerBar_store.magneticMode = !controllerBar_store.magneticMode;
        break;
      case "RotationSnapMode":
        controllerBar_store.setRotationSnapMode(!controllerBar_store.rotationSnapMode);
        break;
      case "GizmoStatus":
        controllerBar_store.gizmoStatus = data.curValue;
        console.log(data.curValue)
        common_store.transcontrol.setaxisType(data.curValue);
        common_store.transcontrol.setSpace(data.curValue);
        break;
      case "AttachMode":
        controllerBar_store.attachMode = !controllerBar_store.attachMode;
        break;
      case "NormalMode":
        controllerBar_store.normalMode = !controllerBar_store.normalMode;
        break;
      default:
        break;
    }
  }

  return {
    sceneSettingUndo,
    sceneSettingRedo,
  };
}
