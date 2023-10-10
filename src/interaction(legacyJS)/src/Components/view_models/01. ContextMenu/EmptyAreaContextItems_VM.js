// import { contextMenu_store } from "../../stores/ContextMenu_Store";
// import { runInAction } from "mobx";
import { previewViewModel } from "../Preview_VM";
import { gridViewModel } from "../02. SceneSetting/SceneSetting_VM";
import { scene_store } from "../../stores/Scene_Store";

const EmptyAreaContextItemViewModel = {
  handlePreview(e) {
    previewViewModel.previewModeHandler(e);
  },

  handleHideGrid() {
    const status = scene_store.isGridVisible || scene_store.isAxisVisible;
    gridViewModel.setIsGridVisible(!status);
    gridViewModel.setIsAxisVisible(!status);
  },
};

export { EmptyAreaContextItemViewModel };
