import { scene_store } from "../../../stores/Scene_Store";

export default class CanvasBackgroundColorToggleOffCommand {
  constructor() {
    this.type = "CanvasBackgroundColorToggleCommand";
    this.name = "배경컬러를 비활성화시킴"
  }

  execute() {
    scene_store.canvasBackgroundColorToggle = false;
  }

  undo() {
    scene_store.canvasBackgroundColorToggle = true;
  }
}