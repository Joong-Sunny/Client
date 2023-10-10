import { scene_store } from "../../../stores/Scene_Store";

export default class SquareGridToggleOnCommand {
  constructor() {
    this.type = "SquareGridToggleCommand";
    this.name = "사각형 그리드를 활성화시킴"
  }

  execute() {
    scene_store.grid.children[0].visible = true;
    scene_store.grid.children[1].visible = true;
    scene_store.isGridVisible = true;
  }

  undo() {
    scene_store.grid.children[0].visible = false;
    scene_store.grid.children[1].visible = false;
    scene_store.isGridVisible = false;
  }
}