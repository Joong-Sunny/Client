import { contextMenu_store } from "../../stores/ContextMenu_Store";
import { object_store } from "../../stores/Object_Store";
import { EmptyAreaContextItemViewModel } from "./EmptyAreaContextItems_VM";
import { ObjectContextItemViewModel } from "./ObjectContextItems_VM";
import { ObjectGroupContextItemViewModel } from "./ObjectGroupContextItems_VM";

import { runInAction } from "mobx";

const contextMenuViewModel = {
  get IsContextMenuOpen() {
    return contextMenu_store.IsContextMenuOpen;
  },

  get isGroupSelected() {
    // return objectViewModel.isGroupSelected;
    // (TBD: 그룹선택 여부에 따라서 true/false 값 리턴해주기)
    return false;
  },

  get position() {
    return contextMenu_store.position;
  },

  get clickStatus() {
    if (object_store.selectedObjects.length !== 0) {
      return "object";
    }
    return "emptyArea";
  },

  /**
   * It should called when Right click on the canvas
   */
  handleClick: (event) => {
    runInAction(() => {
      contextMenu_store.IsContextMenuOpen = true;
      contextMenu_store.position = { x: event.clientX, y: event.clientY };
    });
  },

  handleClickAway: () => {
    runInAction(() => {
      contextMenu_store.IsContextMenuOpen = false;
    });
  },
};

export {
  contextMenuViewModel,
  EmptyAreaContextItemViewModel,
  ObjectContextItemViewModel,
  ObjectGroupContextItemViewModel,
};
