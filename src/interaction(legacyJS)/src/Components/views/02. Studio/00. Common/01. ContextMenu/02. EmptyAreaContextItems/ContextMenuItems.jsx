import ContextItemList from "../ContextItemList_V";
import {
  EmptyAreaContextItemViewModel,
  ObjectContextItemViewModel,
} from "../../../../../view_models/01. ContextMenu/ContextMenu_VM";
import { observer } from "mobx-react-lite";
import { gridViewModel } from "../../../../../view_models/02. SceneSetting/SceneSetting_VM";

class ContextItem {
  constructor(name, shortcut, handler, itemDivider, disabled) {
    this.name = name;
    this.shortcut = shortcut;
    this.handler = handler;
    this.itemDivider = itemDivider;
    this.disabled = disabled;
  }
}

const { handlePreview, handleHideGrid, handleSave } =
  EmptyAreaContextItemViewModel;
const { handlePaste, isPasteDisabled } = ObjectContextItemViewModel;

const EmptyAreaContextItems = observer(() => {
  const items = [
    new ContextItem("미리보기", "O", handlePreview, false, false),
    new ContextItem(
      `그리드 ${gridViewModel.gridStatus ? "숨기기" : "표시"}`,
      "Z",
      handleHideGrid,
      false,
      false
    ),
    new ContextItem("저장", "(Ctrl+S)", handleSave, false, false),
    new ContextItem("붙여넣기", "Ctrl+V", handlePaste, true, isPasteDisabled()),
  ];

  return (
    <>
      <ContextItemList items={items} />
    </>
  );
});

export default EmptyAreaContextItems;
