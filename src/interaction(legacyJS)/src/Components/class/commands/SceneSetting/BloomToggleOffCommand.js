import { scene_store } from "../../../stores/Scene_Store";

export default class BloomToggleOffCommand {
  constructor() {
    this.type = "BloomToggleCommand";
    this.name = "Bloom기능을 비활성화시킴"
  }

  execute() {
    scene_store.bloomToggle = false;
  }

  undo() {
    scene_store.bloomToggle = true;
  }
}