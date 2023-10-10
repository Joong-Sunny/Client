import { mouseEvent_store } from "../stores/MouseEvent_Store";
import { action } from "mobx";

const mouseEventViewModel = {
  get mouseMoveCounter() {
    return mouseEvent_store.mouseMoveCounter;
  },

  updateMouseMoveCounter: action(() => {
    mouseEvent_store.mouseMoveCounter++;
  }),

  judgeMouseMove: () => {
    return mouseEvent_store.mouseMoveCounter < mouseEvent_store.MOUSE_MOVE_JUDGE_COUNT;
  }

}

export { mouseEventViewModel };