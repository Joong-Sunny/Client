export default class ChangeColorCommand {
  constructor(inputAction, changeToNewColor, changeToPrevColor) {
    this.changeValueFunction = changeToNewColor;
    this.undoChangeColorFunction = changeToPrevColor;
    this.type = "ChangeColorCommand";
    this.name = inputAction
  }

  execute() {
    this.changeValueFunction()
  }

  undo() {
    this.undoChangeColorFunction()
  }
}