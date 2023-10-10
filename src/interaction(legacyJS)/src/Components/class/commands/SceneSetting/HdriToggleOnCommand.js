import { scene_store } from "../../../stores/Scene_Store";

export default class HdriToggleOnCommand{
  constructor() {
    this.type = "HdriToggleCommand";
    this.name = "HDRI를 켬"
  }

  execute() {
    scene_store.hdriToggle = true;
  }

  undo() {
    scene_store.hdriToggle = false;
  }
}