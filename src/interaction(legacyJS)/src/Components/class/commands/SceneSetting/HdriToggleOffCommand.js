import { scene_store } from "../../../stores/Scene_Store";

export default class HdriToggleOffCommand{
  constructor() {
    this.type = "HdriToggleCommand";
    this.name = "HDRI를 끔"
  }

  execute() {
    scene_store.hdriToggle = false;
  }

  undo() {
    scene_store.hdriToggle = true;
  }
}