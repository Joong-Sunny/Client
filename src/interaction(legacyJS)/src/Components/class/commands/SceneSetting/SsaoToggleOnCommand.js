import { scene_store } from "../../../stores/Scene_Store";

export default class SsaoToggleOnCommand {
  constructor() {
    this.type = "SsaoToggleCommand";
    this.name = "SSAO기능을 활성화시킴"
  }

  execute() {
    scene_store.SSAOToggle = true;
  }

  undo() {
    scene_store.SSAOToggle = false;
  }
}