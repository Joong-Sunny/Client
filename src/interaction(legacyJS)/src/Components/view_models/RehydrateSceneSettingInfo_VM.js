import {
  ambientLightViewModel,
  directionalLightViewModel,
  backgroundColorViewModel,
  gridViewModel,
} from "../view_models/02. SceneSetting/SceneSetting_VM";
import { action } from "mobx";

/** Rehydrate SceneSettingInfo, saved on Json
 * @param {Object} sceneSettingInfo - SceneSettingInfo saved on Json
 * @returns {void}
 */
const rehydrateSceneSettingInfo = action(function (sceneSettingInfo) {

  //legacy: 기존 프로젝트와 변수명을 맞추기 위함
  const hdriIndx =
    typeof sceneSettingInfo.appliedHdriTemplate !== "undefined"
      ? sceneSettingInfo.appliedHdriTemplate
      : sceneSettingInfo.selectedHdriTemplate;

  // json Info => local state
  gridViewModel.setIsGridVisible(sceneSettingInfo.isGridVisible);
  gridViewModel.setIsAxisVisible(sceneSettingInfo.isAxisVisible);
  ambientLightViewModel.setAlIntensity(sceneSettingInfo.alIntensity);
  ambientLightViewModel.setAlColor(sceneSettingInfo.alColor);
  directionalLightViewModel.setDlIntensity(sceneSettingInfo.dlIntensity);
  directionalLightViewModel.setDlColor(sceneSettingInfo.dlColor);
  backgroundColorViewModel.setCanvasBackgroundColorToggle(
    sceneSettingInfo.canvasBackgroundColorToggle
  );
  backgroundColorViewModel.setCanvasBackgroundColor(
    sceneSettingInfo.canvasBackgroundColor
  );
});

export default rehydrateSceneSettingInfo;
