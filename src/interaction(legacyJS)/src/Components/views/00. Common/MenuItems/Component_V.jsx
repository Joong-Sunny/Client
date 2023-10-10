import { observer } from "mobx-react";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import Error from "../../02. Studio/00. Common/Error_V";
// import { saveViewModel } from "../../../view_models/Save_VM";
import { MyPageVM } from "../../../view_models/MyPage_VM";
import { exportGlbViewModel } from "../../../view_models/ExportGlb_VM";
import { objectViewModel } from "../../../view_models/Object_VM";
import { common_store } from "../../../stores/Common_Store";
import createMxJson from "../../../../utils/createMxJson";
import { eventSystem_store } from "../../../stores/Interaction_Stores";
import downloadFile from "../../../../utils/downloadFile";

const Component = observer(() => {
  const [errorOpen, setError] = useState(false);

  const onCloseError = () => {
    setError(false);
  };
  const onExportHandler = async (e) => {
    await exportGlbViewModel.exportGLB(e);
  };

  const onClickExportJson = (e, fileName = "scene") => {
    renderingContext_store.deleteTransformControls();
    const sceneJson = renderingContext_store.scene.toJSON();
    const interactionJson = eventSystem_store.toJSON();
    const mxJson = createMxJson(sceneJson, interactionJson);
    renderingContext_store.setTransformControls(common_store.transcontrol);
    downloadFile(JSON.stringify(mxJson), `${fileName}.json`, "json");
  };
  return (
    <>
      <MenuItem
        disabled={Boolean(process.env.REACT_APP_GUEST_MODE)}
        onClick={() => {
          saveViewModel.changeToSaveMode();
          saveViewModel.handleSave();
        }}
        disableRipple
      >
        저장
      </MenuItem>
      <MenuItem onClick={MyPageVM.OnOpen} disableRipple>
        목록
      </MenuItem>
      <MenuItem
        disabled={!objectViewModel.isObjectSelected}
        onClick={async () => {
          onExportHandler(1);
        }}
        disableRipple
      >
        GLB로 내보내기(선택)
      </MenuItem>
      <MenuItem
        onClick={async () => {
          onExportHandler(2);
        }}
        disableRipple
      >
        GLB로 내보내기(전체)
      </MenuItem>
      <MenuItem
        onClick={() => {
          common_store.openPmxSaveMenu = true;
        }}
        disableRipple
      >
        배포하기(PMX)
      </MenuItem>
      <MenuItem onClick={onClickExportJson} disableRipple>
        MX JSON 내보내기
      </MenuItem>

      <Error open={errorOpen} onClose={onCloseError} />
    </>
  );
});
export default Component;
