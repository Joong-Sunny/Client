import { observer } from "mobx-react";
import EventFunctions_VM from "../../../view_models/EventFunctions_VM";
import { MenuItem } from "@mui/material";
const PlugIn = observer((props) => {
  const { ImportImg,ImportApart } = EventFunctions_VM();
  const { handleCloseMenu } = props.commonVmProps;
  return (
    <>
      <MenuItem onClick={ImportImg} disableRipple>
        도형이미지기반생성
      </MenuItem>
      <MenuItem onClick={ImportApart} disableRipple>
        아파트도면기반생성
      </MenuItem>
    </>
  );
});
export default PlugIn;
