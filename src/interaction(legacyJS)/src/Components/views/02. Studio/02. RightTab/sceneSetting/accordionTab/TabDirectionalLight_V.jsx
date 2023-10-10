import { Box } from "@mui/material";
import { observer } from "mobx-react";
import MxSlider from "../../commandGUI/MxSlider_V";
import MxColor from "../../commandGUI/MxColor9988_V";
import { directionalLightViewModel } from "../../../../../view_models/02. SceneSetting/SceneSetting_VM";

export const TabDirectionalLightIntensity = observer((props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "55px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <MxSlider
        label={"강도"}
        value={directionalLightViewModel.dlIntensity}
        setValue={directionalLightViewModel.setDlIntensity}
        onChange={directionalLightViewModel.onChangeDlIntensity}
        name={"changeDlIntensity"}
        undoMode={"DlIntensity"}
        min={0}
        max={5}
        step={0.1}
      />
    </Box>
  );
});

export const TabDirectionalLightColor = observer((props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "55px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <MxColor
        key={"DirectionalLight Color"}
        label={"컬러"}
        alpha={false}
        color={directionalLightViewModel.dlColor}
        setColor={directionalLightViewModel.setDlColor}
        onChange={directionalLightViewModel.onChangeDlColor}
        name={"changeDlColor"}
        undoMode={"DlColor"}
      />
    </Box>
  );
});

// const TabHDRITemplate = observer((props) => {
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "110px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <MxSlider
//         label={"강도"}
//         value={directionalLightViewModel.dlIntensity}
//         onChange={directionalLightViewModel.onChangeDlIntensity}
//         name={"changeDlIntensity"}
//         undoMode={"DlIntensity"}
//         onMouseDown={SceneSetting_VM().onMouseDown}
//         onMouseUp={SceneSetting_VM().onMouseUp}
//         min={0}
//         max={5}
//         step={0.1}
//       />
//       <MxLightColor
//         key={"DirectionalLight Color"}
//         label={"컬러"}
//         color={directionalLightViewModel.dlColor}
//         onChange={directionalLightViewModel.onChangeDlColor}
//         name={"changeDlColor"}
//         undoMode={"DlColor"}
//         onMouseDown={SceneSetting_VM().onMouseDown}
//         onMouseUp={SceneSetting_VM().onMouseUp}
//       />
//     </Box>
//   );
// });

// export default TabHDRITemplate;
