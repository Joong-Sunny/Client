import React from "react";
import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import canvasHistory_Store from "../../../stores/CanvasHistory_Store";
import { InitialState, UndoButton, RedoButton } from "./CanvasHistoryListUndoRedoButtons_V";

// Individual list of buttons for each action
const List = observer(({ arrayObject, elementKey, ButtonComponent }) => {
  return (
    <>
      {elementKey === "interactionUndo" && <InitialState arrayObject={arrayObject} />}
      {Array.from(arrayObject).map((object, index, origin) => (
        <ButtonComponent
          key={elementKey + index}
          object={object}
          isTopUndoHistory={elementKey === "interactionUndo" && index === origin.length - 1}
        />
      ))}
    </>
  );
});

// Undo and redo lists with their individual buttons
const UndoList = observer(() =>
  <List arrayObject={canvasHistory_Store.undoArray} elementKey="interactionUndo" ButtonComponent={UndoButton} />);
const RedoList = observer(() =>
  <List arrayObject={canvasHistory_Store.redoArray} elementKey="interactionRedo" ButtonComponent={RedoButton} />);

// History list with all the undo and redo actions
const CanvasHistoryList = () => {
  return (
    <Grid
      container
      direction="column-reverse"
      justifyContent="space-evenly"
      alignItems="flex-start"
      sx={style.grid}
      style={{ display: "flex", justifyContent: "flex-start" }}
    >
      <UndoList />
      <RedoList />
    </Grid>
  );
};

export default CanvasHistoryList;

const style = {
  grid: {
    mt: "10px",
    ml: "11px",
    overflow: "auto",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": { width: 0 },
  },
};
