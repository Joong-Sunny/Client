import { observer } from "mobx-react";

import { MenuItem } from "@mui/material";
import { useState } from "react";
import InterfaceSetting from "./Setting/InterfaceSetting_V";
import HotKey from "./Setting/HotKey/HotKey_V";
const Setting = observer((props) => {
  const { handleCloseMenu } = props.commonVmProps;
  const [interfaceOpen, setInterfaceOpen] = useState(false);
  const interfaceHandler = () => {
    if (interfaceOpen) setInterfaceOpen(false);
    else setInterfaceOpen(true);
  };
  const InterfaceCloseHandler = () => {
    setInterfaceOpen(false);
    handleCloseMenu();
  };

  const [shortCutOpen, setShortCutOpen] = useState(false);
  const shortCutHandler = () => {
    if (shortCutOpen) setShortCutOpen(false);
    else setShortCutOpen(true);
  };
  const ShortCutCloseHandler = () => {
    setShortCutOpen(false);
    handleCloseMenu();
  };

  return (
    <>
      <MenuItem onClick={interfaceHandler} disableRipple>
        인터페이스
      </MenuItem>
      <MenuItem onClick={shortCutHandler} disableRipple>
        단축키
      </MenuItem>
      <MenuItem disabled onClick={handleCloseMenu} disableRipple>
        자동저장
      </MenuItem>
      <InterfaceSetting open={interfaceOpen} onClose={InterfaceCloseHandler} />
      <HotKey open={shortCutOpen} onClose={ShortCutCloseHandler} />
    </>
  );
});
export default Setting;
