import { observer } from "mobx-react";
import ControllerButton from "./CustomTooltipButton";
import {
  FormControl,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import MxCheckBox from "../../02. Studio/02. RightTab/gui/CheckBox_V";
import { controllerBarViewModel } from "../../../view_models/ContorllerBar_VM";

const FocusButton = observer(() => {
  return (
    <>
      <ControllerButton
        title={<SnapSelection />}
        disableRipple
        id="snap"
        onClickButton={() => {}}
        condition={controllerBarViewModel.snapStatus}
        imgSrc1="/legacyJS/Icons/Studio/icon_snap_activated.svg"
        imgSrc2="/legacyJS/Icons/Studio/icon_snap.svg"
        altText1="icon_snap_activated"
        altText2="icon_snap"
        arrowUp={true}
      />
    </>
  );
});
export default FocusButton;

const SnapSelection = observer(() => {
  const gridSnapHotKeyObject = hotKeys.find(
    (hotKeyCommand) => hotKeyCommand.name === "그리드 스냅"
  );
  const rotationSnapHotKeyObject = hotKeys.find(
    (hotKeyCommand) => hotKeyCommand.name === "45°회전 스냅"
  );
  const putOnSnapHotKeyObject = hotKeys.find(
    (hotKeyCommand) => hotKeyCommand.name === "표면 스냅 -> 축 활성화"
  );
  const normalModeHotKeyObject = hotKeys.find(
    (hotKeyCommand) => hotKeyCommand.name === "표면 스냅 -> 축 비활성화"
  );

  return (
    <FormControl component="fieldset">
      <Box sx={style.checkBoxWrapper}>
        <Box sx={style.checkboxAndHotKeyWrapper}>
          <MxCheckBox
            checked={controllerBarViewModel.gridSnap}
            label={"그리드 스냅"}
            onChange={() => {
              controllerBarViewModel.onCheckGridSnap();
            }}
          />
          <Typography sx={style.textArea}>
            {gridSnapHotKeyObject.key}
          </Typography>
        </Box>
        <Box sx={style.checkboxAndHotKeyWrapper}>
          <MxCheckBox
            checked={controllerBarViewModel.rotationSnap}
            label={"45°회전 스냅"}
            onChange={() => {
              controllerBarViewModel.onCheckRotationSnap();
            }}
          />
          <Typography sx={style.textArea}>
            {rotationSnapHotKeyObject.key}
          </Typography>
        </Box>
        <Box sx={style.checkboxAndHotKeyWrapper}>
          <MxCheckBox
            checked={controllerBarViewModel.putOnSnap}
            label={"표면 스냅"}
            onChange={() => {
              controllerBarViewModel.onCheckPutOnSnap();
            }}
          />
          <Typography sx={style.textArea}></Typography>
        </Box>
        <ToggleButtonGroup
          size="small"
          value={controllerBarViewModel.normalMode}
          exclusive
          onChange={(e, mode) =>
            controllerBarViewModel.toggleNormalMode(e, mode)
          }
          sx={{ display: "flex", justifyContent: "center" }}
          disabled={!controllerBarViewModel.putOnSnap}
        >
          <ToggleButton
            size="small"
            value="attachMode"
            sx={style.generateSx(!controllerBarViewModel.normalMode)}
          >
            축 활성화 {putOnSnapHotKeyObject.key}
          </ToggleButton>
          <ToggleButton
            size="small"
            value="normalMode"
            sx={style.generateSx(controllerBarViewModel.normalMode)}
          >
            축 비활성화 {normalModeHotKeyObject.key}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </FormControl>
  );
});

const style = {
  checkBoxWrapper: {
    width: "151px",
    height: "131px",
    display: "flex",
    padding: "10px 0px 10px 0px",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  checkboxAndHotKeyWrapper: {
    paddingLeft: "10px",
    display: "flex",
    justifyContent: "space-between",
  },

  textArea: {
    color: "#535353",
  },

  generateSx(isNormalMode) {
    return {
      padding: "0px 4px",
      fontSize: "12px",
      backgroundColor: isNormalMode ? "#3D4227" : "white",
      color: isNormalMode ? "#CEED51" : "#7F7F7F",
      "&.Mui-selected": {
        backgroundColor: "red",
        color: "white",
      },
      "&:hover": {
        backgroundColor: isNormalMode ? "#3D4227" : "white",
        color: isNormalMode ? "white" : "black",
      },
    };
  },
};
