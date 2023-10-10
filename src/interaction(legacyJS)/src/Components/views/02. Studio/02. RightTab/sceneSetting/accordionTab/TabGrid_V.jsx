import { Box } from "@mui/material";
import { observer } from "mobx-react";
import MxSwitch from "../../gui/Switch_V";
import { gridViewModel } from "../../../../../view_models/02. SceneSetting/SceneSetting_VM";

export const TabSquareGrid = observer(() => {
  return (
    <MxSwitch
      style={{ mt: 1 }}
      label={"사각형그리드"}
      onChange={gridViewModel.gridToggleHandler}
      checked={gridViewModel.isGridVisible}
    />
  );
});

export const TabAxisGrid = observer(() => {
  return (
    <MxSwitch
      style={{ mt: 1 }}
      label={"중심선그리드"}
      onChange={gridViewModel.axisToggleHandler}
      checked={gridViewModel.isAxisVisible}
    />
  );
});

// const style = {
//   boxWrapper: {
//     width: "100%",
//     height: "110px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
// };
