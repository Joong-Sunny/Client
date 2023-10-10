import { Button, Tooltip } from "@mui/material";
import storeContainer from "../../../stores/storeContainer";
import { sceneSettingModeViewModel } from "../../../view_models/02. SceneSetting/SceneSetting_VM";
import { observer } from "mobx-react-lite";

const SceneSettingLNB = observer(() => {
  const { common_store } = storeContainer;

  return (
    <>
      {common_store.curCategory === "canvas" && (
        <Tooltip
          title={(!common_store.isSceneSetting && "씬설정") || "씬설정종료"}
          placement="bottom"
          arrow
          componentsProps={style.tooltipAndArrow()}
        >
          <Button
            data-testid="sceneSettingBtn"
            id="sceneSettingBtn"
            sx={{}}
            disableRipple
            onClick={(e) => {
              sceneSettingModeViewModel.sceneSettingBtnHandler(e);
            }}
          >
            <img src="/Icons/Studio/icon_씬설정.svg" alt="icon_씬설정" />
          </Button>
        </Tooltip>
      )}
    </>
  );
});

export default SceneSettingLNB;

const style = {
  tooltip: {
    fontFamily: "Inter",
    fontSize: "10px",
    color: "#e1f853",
    bgcolor: "#282828",
    border: "solid 0.5px #535353",
    top: -15,
  },
  arrow: {
    "&::before": {
      backgroundColor: "#282828",
      border: "solid 0.5px #535353",
    },
  },
  tooltipAndArrow: function () {
    return {
      tooltip: {
        sx: style.tooltip,
      },
      arrow: {
        sx: style.arrow,
      },
    };
  },
};
