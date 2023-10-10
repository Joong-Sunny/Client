import ContextItemList from "../ContextItemList_V";
import {
  contextMenuViewModel,
  ObjectContextItemViewModel,
  ObjectGroupContextItemViewModel,
} from "../../../../../view_models/01. ContextMenu/ContextMenu_VM";
import { observer } from "mobx-react-lite";

class ContextItem {
  constructor(name, shortcut, handler, itemDivider, disabled, display) {
    this.name = name;
    this.shortcut = shortcut;
    this.handler = handler;
    this.itemDivider = itemDivider;
    this.disabled = disabled;
    this.display = display ? "flex" : "none";
  }
}

const {
  handleCopy,
  handlePaste,
  handleGroup,
  handleUnGroup,
  handleLock,
  handleHide,
  handleDelete,
  handleDependency,
  handleUnDependency,
  isPasteDisabled,
  isCopyDisabled,
  isGroupDisabled,
  isGroupDisplay,
  isHideDisabled,
  isDeleteDisabled,
  isLockDisplay,
  isHideDisplay,
  isDependencyDisabled,
  isDependencyDisplay,
  isUnDependencyDisabled,
  isUnDependencyDisplay,
} = ObjectContextItemViewModel;

const {
  handleCopyGroup,

  handleLockGroup,
  handleHideGroup,
  handleDeleteGroup,
} = ObjectGroupContextItemViewModel;
// prettier-ignore
const ObjectContextMenuItems = observer(() => {
  const groupItems = [
    new ContextItem("복사", "Ctrl+C", handleCopyGroup, false),
    new ContextItem("붙여넣기", "Ctrl+V", handlePaste, true),
    new ContextItem("그룹 해제", "Ctrl+Shift+G", handleUnGroup, true),
    new ContextItem("잠그기", "Ctrl+L", handleLockGroup, false),
    new ContextItem("숨기기", "Ctrl+,", handleHideGroup, true),
    new ContextItem("삭제", "Del", handleDeleteGroup, false),
  ];

  const baseItems = [
    new ContextItem("복사", "Ctrl+C", handleCopy, false, isCopyDisabled(),true),
    new ContextItem("붙여넣기", "Ctrl+V", handlePaste, true, isPasteDisabled(),true),
    new ContextItem("그룹", "Ctrl+G", handleGroup, true, isGroupDisabled(),isGroupDisplay()),
    new ContextItem("그룹 해제", "Ctrl+G", handleUnGroup,true,!isGroupDisabled(), !isGroupDisplay()),
    new ContextItem("종속 관계 설정", "Ctrl+P", handleDependency, true, isDependencyDisabled(),isDependencyDisplay()),
    new ContextItem("종속 관계 해제", "Ctrl+P", handleUnDependency, true, isUnDependencyDisabled(),isUnDependencyDisplay()),
    new ContextItem("잠그기", "Ctrl+L", handleLock, false,false, isLockDisplay()),
    new ContextItem("잠금 해제", "Ctrl+L", handleLock, false,false, !isLockDisplay()),
    new ContextItem("숨기기", "Ctrl+,", handleHide, true,isHideDisabled(),isHideDisplay()),
    new ContextItem("보이기", "Ctrl+,", handleHide, true,isHideDisabled(),!isHideDisplay()),
    new ContextItem("삭제", "Del", handleDelete, false,isDeleteDisabled(),true),
  ];

  const items = contextMenuViewModel.isGroupSelected ? groupItems : baseItems;

  return (
    <>
      <ContextItemList items={items} />
    </>
  );
});

export default ObjectContextMenuItems;
