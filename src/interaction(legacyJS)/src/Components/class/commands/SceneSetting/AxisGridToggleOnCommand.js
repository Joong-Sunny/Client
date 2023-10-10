import { scene_store } from "../../../stores/Scene_Store";

export default class AxisGridToggleOnCommand {
  constructor() {
    this.type = "AxisGridToggleCommand";
    this.name = "중심선그리드를 활성화시킴"
  }

  execute() {
    scene_store.grid.children[2].visible = true;
    scene_store.isAxisVisible = true;
  }

  undo() {
    scene_store.grid.children[2].visible = false;
    scene_store.isAxisVisible = false;
  }
}