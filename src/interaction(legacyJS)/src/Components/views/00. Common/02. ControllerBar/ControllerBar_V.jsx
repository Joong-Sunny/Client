import {Box} from "@mui/material";
import {observer} from "mobx-react";
import FocusButton from "./ControllerBarFocusButton_V"
import GizmoButton from "./ControllerBarGizmoButton_V"
import SnapButton from "./ControllerBarSnapButton_V"

const ControllerBar = observer(() => {
  return (
    <Box position="absolute" sx={style.buttonContainer}>
      <FocusButton/>
      <Box sx={style.gizmoAndSnapContainer}>
        <GizmoButton/>
        <SnapButton/>
      </Box>
    </Box>
  );
});

export default ControllerBar;

const style = {
  buttonContainer: {
    left: "50%",
    top: "91.57%",
    transform: "translate(-50%)",
    zIndex: 2,
    height: "36px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "#282828",
  },

  gizmoAndSnapContainer: {
    display: "flex",
    bgcolor: "#1D1D1D",
    minWidth: "0px",
    minHeight: "0px",
    borderRadius: 3,
  }
}
