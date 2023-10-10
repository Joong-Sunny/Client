import { observer } from "mobx-react";
import { Box } from "@mui/material";
import { common_store } from "../../../stores/Common_Store";
import ControllerButton from "./CustomTooltipButton";
import { controllerBarViewModel } from "../../../view_models/ContorllerBar_VM";

const FocusButton = observer(() => {
  return (
    <Box sx={{ mr: 1 }}>
      <ControllerButton
        title="오브젝트포커스"
        id="focus"
        onClickButton={() => {
          controllerBarViewModel.focusOnObject();
        }}
        disableRipple
        condition={common_store.curMode === "select"}
        imgSrc1="/legacyJS/Icons/Studio/icon_focus_activated.svg"
        imgSrc2="/legacyJS/Icons/Studio/icon_focus.svg"
        altText1="icon_focus_activated"
        altText2="icon_focus"
        arrowUp={false}
      />
    </Box>
  );
});
export default FocusButton;
