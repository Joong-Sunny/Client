import { scene_store } from "../../../stores/Scene_Store";

export default class SsaoToggleOffCommand {
  constructor() {
    this.type = "SsaoToggleCommand";
    this.name = "SSAO기능을 비활성화시킴"
  }

  execute() {
    scene_store.SSAOToggle = false;
  }

  undo() {
    scene_store.SSAOToggle = true;
  }
}