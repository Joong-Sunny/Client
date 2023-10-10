import { scene_store } from "../../../stores/Scene_Store";

export default class HdriBackgroundToggleOffCommand{
  constructor() {
    this.type = "HdriBackgroundToggleCommand";
    this.name = "HDRI 배경을 비활성화시"
  }

  execute() {
    scene_store.hdriBackgroundToggle = false;
  }

  undo() {
    scene_store.hdriBackgroundToggle = true;
  }
}