import { scene_store } from "../../stores/Scene_Store";
import canvasHistory_store from "../../stores/CanvasHistory_Store";
import CanvasBackgroundToggleOffCommand from "../../class/commands/SceneSetting/CanvasBackgroundColorToggleOffCommand";
import CanvasBackgroundToggleOnCommand from "../../class/commands/SceneSetting/CanvasBackgroundColorToggleOnCommand";
import SquareGridToggleOffCommand from "../../class/commands/SceneSetting/SquareGridToggleOffCommand";
import SquareGridToggleOnCommand from "../../class/commands/SceneSetting/SquareGridToggleOnCommand";
import canvasHistory_Store from "../../stores/CanvasHistory_Store";
import AxisGridToggleOffCommand from "../../class/commands/SceneSetting/AxisGridToggleOffCommand";
import AxisGridToggleOnCommand from "../../class/commands/SceneSetting/AxisGridToggleOnCommand";

const backgroundColorViewModel = {
  get canvasBackgroundColorToggle() {
    return scene_store.canvasBackgroundColorToggle;
  },
  setCanvasBackgroundColorToggle(boolean) {
    scene_store.canvasBackgroundColorToggle = boolean;
  },
  onChangeCanvasBackgroundColorToggle() {
    if (scene_store.canvasBackgroundColorToggle) {
      canvasHistory_store.execute(new CanvasBackgroundToggleOffCommand());
    } else {
      canvasHistory_store.execute(new CanvasBackgroundToggleOnCommand());
    }
  },
  get canvasBackgroundColor() {
    return scene_store.canvasBackgroundColor;
  },
  setCanvasBackgroundColor(hsvaColor) {
    scene_store.canvasBackgroundColor = hsvaColor;
  },
};

const gridViewModel = {
  get grid() {
    return scene_store.grid;
  },
  get isGridVisible() {
    return scene_store.isGridVisible;
  },
  setIsGridVisible(boolean) {
    scene_store.grid.children[0].visible = boolean;
    scene_store.grid.children[1].visible = boolean;
    scene_store.isGridVisible = boolean;
  },
  get isAxisVisible() {
    return scene_store.isAxisVisible;
  },
  get gridStatus() {
    return scene_store.isGridVisible || scene_store.isAxisVisible;
  },
  setIsAxisVisible(boolean) {
    scene_store.grid.children[2].visible = boolean;
    scene_store.isAxisVisible = boolean;
  },
  toggleAxis() {
    if (scene_store.isAxisVisible) {
      scene_store.grid.children[2].visible = false;
      scene_store.isAxisVisible = false;
    } else {
      scene_store.grid.children[2].visible = true;
      scene_store.isAxisVisible = true;
    }
  },
  toggleGrid() {
    if (scene_store.isGridVisible) {
      scene_store.grid.children[0].visible = false;
      scene_store.grid.children[1].visible = false;
      scene_store.isGridVisible = false;
    } else {
      scene_store.grid.children[0].visible = true;
      scene_store.grid.children[1].visible = true;
      scene_store.isGridVisible = true;
    }
  },
  gridToggleHandler() {
    if (scene_store.isGridVisible) {
      canvasHistory_store.execute(new SquareGridToggleOffCommand());
    } else {
      canvasHistory_store.execute(new SquareGridToggleOnCommand());
    }
  },

  axisToggleHandler() {
    if (scene_store.isAxisVisible) {
      canvasHistory_Store.execute(new AxisGridToggleOffCommand());
    } else {
      canvasHistory_store.execute(new AxisGridToggleOnCommand());
    }
  },
};

export { backgroundColorViewModel, gridViewModel };
