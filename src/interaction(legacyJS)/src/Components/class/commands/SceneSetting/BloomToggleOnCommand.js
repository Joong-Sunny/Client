import { scene_store } from "../../../stores/Scene_Store";

export default class BloomToggleOnCommand {
  constructor() {
    this.type = "BloomToggleCommand";
    this.name = "Bloom기능을 활성화시킴"
  }

  execute() {
    scene_store.bloomToggle = true;
  }

  undo() {
    scene_store.bloomToggle = false;
  }
}