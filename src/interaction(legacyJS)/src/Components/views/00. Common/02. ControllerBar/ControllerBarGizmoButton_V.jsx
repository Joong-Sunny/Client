import { observer } from "mobx-react";
import ControllerButton from "./CustomTooltipButton";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { controllerBarViewModel } from "../../../view_models/ContorllerBar_VM";

const FocusButton = observer(() => {
  return (
    <>
      <ControllerButton
        title={<LocalGlobalSelection />}
        disableRipple
        id="gizmo"
        onClickButton={() => {}}
        condition={controllerBarViewModel.gizmoStatus === "world"}
        imgSrc1="/legacyJS/Icons/Studio/icon_gizmo_global_activated.svg"
        imgSrc2="/legacyJS/Icons/Studio/icon_gizmo_local_activated.svg"
        altText1="icon_gizmo_global"
        altText2="icon_gizmo_local"
        arrowUp={true}
      />
    </>
  );
});
export default FocusButton;

const LocalGlobalSelection = observer(() => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="options"
        name="options"
        value={controllerBarViewModel.gizmoStatus}
        onChange={controllerBarViewModel.onCheckGizmoStatus}
      >
        <FormControlLabel
          value="local"
          control={
            <Radio
              sx={{ "&.Mui-checked": { color: "#d4ed3e" }, size: "small" }}
            />
          }
          label={<Typography variant="body2">로컬</Typography>}
        />
        <FormControlLabel
          value="world"
          control={
            <Radio
              sx={{ "&.Mui-checked": { color: "#d4ed3e" }, size: "small" }}
            />
          }
          label={<Typography variant="body2">글로벌</Typography>}
        />
      </RadioGroup>
    </FormControl>
  );
});
