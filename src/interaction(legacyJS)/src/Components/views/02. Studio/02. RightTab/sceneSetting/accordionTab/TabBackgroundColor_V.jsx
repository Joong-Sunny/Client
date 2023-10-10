import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import MxColor from "../../commandGUI/MxColor9988_V";
import { backgroundColorViewModel } from "../../../../../view_models/02. SceneSetting/SceneSetting_VM";
import MxCheckBoxWithEye from "../../gui/CheckBoxWithEye_V";

const TabBackgroundColor = observer((props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Inter",
          fontSize: "11px",
          color: "#e2e2e2",
        }}
      >
        배경컬러
      </Typography>
      <Box sx={{ display: "flex" }}>
        <MxCheckBoxWithEye
          checked={backgroundColorViewModel.canvasBackgroundColorToggle}
          label=""
          onChange={
            backgroundColorViewModel.onChangeCanvasBackgroundColorToggle
          }
        />
        <MxColor
          key={"Background Color"}
          label={""}
          alpha={false}
          name={"changeCanvasBackgroundColor"}
          color={backgroundColorViewModel.canvasBackgroundColor}
          setColor={backgroundColorViewModel.setCanvasBackgroundColor}
        />
      </Box>
    </Box>
  );
});

export default TabBackgroundColor;
