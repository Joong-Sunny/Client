import { scene_store } from "../../../stores/Scene_Store";

export default class HdriBackgroundToggleOnCommand{
  constructor() {
    this.type = "HdriBackgroundToggleCommand";
    this.name = "HDRI 배경을 활성화시킴"
  }

  execute() {
    scene_store.hdriBackgroundToggle = true;
  }

  undo() {
    scene_store.hdriBackgroundToggle = false;
  }
}