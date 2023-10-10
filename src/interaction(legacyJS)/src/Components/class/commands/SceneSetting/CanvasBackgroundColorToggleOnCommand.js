import { scene_store } from "../../../stores/Scene_Store";

export default class CanvasBackgroundColorToggleOnCommand {
  constructor() {
    this.type = "CanvasBackgroundColorToggleCommand";
    this.name = "배경컬러를 활성화시킴"
  }

  execute() {
    scene_store.canvasBackgroundColorToggle = true;
  }

  undo() {
    scene_store.canvasBackgroundColorToggle = false;
  }
}