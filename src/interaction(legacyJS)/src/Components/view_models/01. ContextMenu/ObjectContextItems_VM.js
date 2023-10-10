import { objectCopyCutPasteViewModel } from "../ObjectCopyCutPaste_VM";
import { object_store } from "../../stores/Object_Store";
import { ObjectControllerVM } from "../ObjectController_VM";
import { ObjectStateVM } from "../ObjectState_VM";
import { objectViewModel } from "../../view_models/Object_VM";
import canvasHistory_store from "../../stores/CanvasHistory_Store";
import DependencyCommand from "../../class/commands/CanvasObject/DependencyCommand";
import UnDependencyCommand from "../../class/commands/CanvasObject/UnDependencyCommand";
import GroupCommand from "../../class/commands/CanvasObject/GroupCommand";
import UnGroupCommand from "../../class/commands/CanvasObject/UnGroupCommand";

const ObjectContextItemViewModel = {
  handleCopy(e) {
    console.log("컨텍스트메뉴를 통해 복사됨!!");
    objectCopyCutPasteViewModel.copy(e);
  },

  handlePaste(e) {
    console.log("컨텍스트메뉴를 통해 붙여넣기됨!!");
    objectCopyCutPasteViewModel.paste(e);
  },

  handleGroup() {
    canvasHistory_store.execute(
      new GroupCommand(objectViewModel.selectedObjects)
    );
  },
  handleUnGroup() {
    canvasHistory_store.execute(
      new UnGroupCommand(objectViewModel.selectedObjects[0])
    );
  },
  handleLock() {
    if (ObjectStateVM.selectedState === "Multiple") {
      for (const object of object_store.selectedObjects) {
        ObjectControllerVM.Lock(object);
      }
    } else {
      const object = object_store.selectedObjects[0];
      ObjectControllerVM.Lock(object);
    }
  },

  handleHide() {
    if (ObjectStateVM.selectedState === "Multiple") {
      for (const object of object_store.selectedObjects) {
        ObjectControllerVM.Hide(object);
      }
    } else {
      const object = object_store.selectedObjects[0];
      ObjectControllerVM.Hide(object);
    }
  },

  handleDeselect(e) {
    objectCopyCutPasteViewModel.deselectObject(e);
  },

  handleDelete(e) {
    objectCopyCutPasteViewModel.deleteOBJ(e);
  },
  handleDependency() {
    canvasHistory_store.execute(
      new DependencyCommand(objectViewModel.selectedObjects)
    );
  },
  handleUnDependency() {
    canvasHistory_store.execute(
      new UnDependencyCommand(objectViewModel.selectedObjects[0])
    );
  },
  isPasteDisabled() {
    return objectViewModel.objectClipBoard === null;
  },

  isCopyDisabled() {
    if (
      object_store.selectedObjects[0].type === "PerspectiveCamera" ||
      object_store.selectedObjects[0].props["lock"]
    ) {
      return true;
    }
    return false;
  },
  isGroupDisabled() {
    if (ObjectStateVM.selectedState !== "Multiple") return true;

    return false;
  },
  isGroupDisplay() {
    if (ObjectStateVM.selectedState !== "Group") return true;

    return false;
  },
  isLockDisabled() {
    return object_store.selectedObjects[0].props["lock"];
  },
  isHideDisabled() {
    return object_store.selectedObjects[0].props["lock"];
  },
  isLockDisplay() {
    return !object_store.selectedObjects[0].props["lock"];
  },
  isHideDisplay() {
    return object_store.selectedObjects[0].props["visible"];
  },
  isDeleteDisabled() {
    return object_store.selectedObjects[0].props["lock"];
  },

  isDependencyDisabled() {
    if (ObjectStateVM.selectedState === "Multiple") {
      const typeCounts = { PerspectiveCamera: 0, Light: 0, etc: 0 };
      objectViewModel.selectedObjects.forEach((metaObject) => {
        if (
          metaObject.type === "PerspectiveCamera" ||
          metaObject.type === "Light"
        ) {
          typeCounts[metaObject.type]++;
        } else {
          typeCounts["etc"]++;
        }
      });
      if (
        (typeCounts["PerspectiveCamera"] === 1 || typeCounts["Light"] === 1) &&
        typeCounts["etc"] === 1
      ) {
        return false;
      }
    }
    return true;
  },
  isDependencyDisplay() {
    if (ObjectStateVM.selectedState === "Multiple") return true;

    return false;
  },
  isUnDependencyDisabled() {
    if (ObjectStateVM.selectedState === "Dependency") return false;
    return true;
  },
  isUnDependencyDisplay() {
    if (
      ObjectStateVM.selectedState !== "Multiple" &&
      ObjectStateVM.selectedState === "Dependency"
    )
      return true;
  },
};

export { ObjectContextItemViewModel };
