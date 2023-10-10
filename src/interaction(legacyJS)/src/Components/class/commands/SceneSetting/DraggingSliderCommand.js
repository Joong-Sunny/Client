export default class ChangeSliderValueCommand {
  constructor(inputAction, changeToNewValue, changeToPrevValue) {
    this.changeValueFunction = changeToNewValue;
    this.undoChangeValueFunction = changeToPrevValue;
    this.type = "ChangeSliderValueCommand";
    this.name = inputAction;
  }

  execute() {
    this.changeValueFunction();
  }

  undo() {
    this.undoChangeValueFunction();
  }
}
