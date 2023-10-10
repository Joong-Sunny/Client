import { common_store } from "../../stores/Common_Store";
import { ObjectControllerVM } from "../ObjectController_VM";

const sceneSettingModeViewModel = {
  sceneSettingBtnHandler(e) {
    e.currentTarget.blur();
    if (common_store.isSceneSetting) {
      common_store.setIsSceneSetting(false);
    } else {
      common_store.setIsSceneSetting(true);
      common_store.setIsPreview(false);
      ObjectControllerVM.DeSelectAll();
    }
  },
};

export default sceneSettingModeViewModel;
