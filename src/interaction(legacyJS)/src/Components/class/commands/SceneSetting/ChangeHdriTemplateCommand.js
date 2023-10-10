import { scene_store } from "../../../stores/Scene_Store";

export default class ChangeHdriTemplateCommand {
  constructor(prevValue, newValue) {
    this.prevValue = prevValue;
    this.newValue = newValue;
    this.type = "ChangeHdriTemplateCommand"
    this.name = "HDRI 템플릿을 변경"
  }

  execute() {
    scene_store.appliedHdriTemplate = this.newValue
  }

  undo() {
    scene_store.appliedHdriTemplate = this.prevValue
  }
}