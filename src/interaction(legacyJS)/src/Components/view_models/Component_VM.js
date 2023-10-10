import { component_store } from "../stores/Component_Store";
import { exportGlbViewModel } from "./ExportGlb_VM";
import { action } from "mobx";

const componentViewModel = {
  get componentName() {
    if (exportGlbViewModel.componentName.trim().length === 0) {
      return "Component name(1)";
    }
    return exportGlbViewModel.componentName;
  },

  get unveiledComponentName() {
    return exportGlbViewModel.componentName;
  },

  setComponentName: action((name) => {
    if (name.trim() === "") return;
    component_store.componentName = name;
  }),
};

export { componentViewModel };
