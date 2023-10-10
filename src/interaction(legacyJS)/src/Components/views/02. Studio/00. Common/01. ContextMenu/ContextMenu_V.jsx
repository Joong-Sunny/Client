import { Popper, ClickAwayListener } from "@mui/material";
import { contextMenuViewModel } from "../../../../view_models/01. ContextMenu/ContextMenu_VM";
import { observer } from "mobx-react-lite";
import ObjectContextMenuItems from "./01. ObjectContextMenuItems/ContextMenuItems";
import EmptyAreaContextItems from "./02. EmptyAreaContextItems/ContextMenuItems";

const ContextMenu = observer(() => {
  const virtualElement = {
    getBoundingClientRect: () => ({
      top: contextMenuViewModel.position.y,
      left: contextMenuViewModel.position.x,
      bottom: contextMenuViewModel.position.y,
      right: contextMenuViewModel.position.x,
      width: 0,
      height: 0,
    }),
  };

  return (
    <ClickAwayListener onClickAway={contextMenuViewModel.handleClickAway}>
      <div>
        <Popper
          open={contextMenuViewModel.IsContextMenuOpen}
          anchorEl={virtualElement}
          style={{
            position: "fixed",
            top: `${contextMenuViewModel.position.y}px`,
            left: `${contextMenuViewModel.position.x}px`,
          }}
          placement="bottom-start"
        >
          {
            <>
              {contextMenuViewModel.clickStatus === "object" ? (
                <ObjectContextMenuItems />
              ) : (
                <EmptyAreaContextItems />
              )}
            </>
          }
        </Popper>
      </div>
    </ClickAwayListener>
  );
});

export default ContextMenu;
