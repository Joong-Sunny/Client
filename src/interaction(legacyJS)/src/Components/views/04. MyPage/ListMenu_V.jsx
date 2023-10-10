import { Menu, MenuItem } from "@mui/material";
import { observer } from "mobx-react";
import storeContainer from "../../stores/storeContainer";
import Common_VM from "../../view_models/Common_VM";
import { common_store } from "../../stores/Common_Store";
import { useState } from "react";
import Error from "../02. Studio/00. Common/Error_V";
import { MyPageVM } from "../../view_models/MyPage_VM";
import { componentViewModel } from "../../view_models/Component_VM";
import { exportGlbViewModel } from "../../view_models/ExportGlb_VM";

const ListMenu = observer((props) => {
  const { user_store } = storeContainer;
  const { anchorMenu, openMenu, handleCloseMenu } = props.commonVmProps;
  const { open, handleOpen, handleClose } = Common_VM();
  const [errorOpen, setError] = useState(false);
  const onOpenError = () => {
    setError(true);
  };
  const onCloseError = () => {
    setError(false);
  };

  const onChangeName = (name, proIdx) => {
    if (user_store.isProjectName(name)) {
      return false;
    } else {
      componentViewModel.setComponentName(name);
      return true;
    }
  };

  const handleCloseWithSave = async () => {
    if (componentViewModel.unveiledComponentName.length !== 0) {
      if (!user_store.isProjectName(componentViewModel.componentName)) {
        common_store.setIsLoading(true);
        await user_store.UpdateProjectName(
          exportGlbViewModel.componentName,
          MyPageVM.selProIdx - 1
        );
        common_store.setIsLoading(false);
      } else {
        onOpenError();
      }
    }
    handleClose();
  };
  const ClickHanlderUpdate = async () => {
    handleOpen();
  };
  return (
    <Menu
      anchorEl={anchorMenu}
      open={openMenu}
      onClose={handleCloseMenu}
      sx={style.menuStyle}
    >
      {/* <MenuItem disableRipple>들어가기</MenuItem> */}
      <MenuItem
        onClick={async () => {
          await MyPageVM.OnClickHanlderDelete();
          handleCloseMenu();
        }}
      >
        삭제
      </MenuItem>
      <MenuItem onClick={ClickHanlderUpdate}>이름 변경</MenuItem>
      <Name
        version="Save"
        originName={user_store.my_project_name_list[MyPageVM.selProIdx - 1]}
        onClose={handleCloseWithSave}
        open={open}
        onChangeName={onChangeName}
      />
      <Error open={errorOpen} onClose={onCloseError} />
    </Menu>
  );
});

export default ListMenu;
const style = {
  menuStyle: {
    "& .MuiMenuItem-root": {
      width: "80px",
      pl: "5px",
      color: "#fff",
      textAlign: "left",
      fontFamily: "SourceHanSansKR",
      fontSize: "13px",
      borderRadius: "5px",
      "&:hover": {
        backgroundColor: "#bababa",
      },
    },
    "& .MuiPaper-root": {
      width: "90px",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#393939",
    },
  },
};
