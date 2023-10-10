import React from "react";
import { IconButton, Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import storeContainer from "../../../stores/storeContainer";
import useIcon from "../../../hooks/useIcon";
import { ObjectStateVM } from "../../../view_models/ObjectState_VM";
import { ObjectControllerVM } from "../../../view_models/ObjectController_VM";

const MainPanel = observer(() => {
  const { common_store, object_store } = storeContainer;
  const ref = React.useRef();
  const historyIcon = useIcon("icon_history", {
    path: "/legacyJS/Icons/Studio/",
  });
  const hierarchyIcon = useIcon("icon_hierarchy", {
    path: "/legacyJS/Icons/Studio/",
  });

  return (
    <Box
      hidden={common_store.curCategory !== "canvas"}
      id="MainPanel"
      ref={ref}
      sx={{
        width: "100%",
        height: `calc(100vh - ${78}px)`,
        display: "flex",
      }}
    >
      <Box id="left" sx={style.historyIconWrapper}>
        {!common_store.isPreview && (
          <IconButton
            onClick={() => {
              common_store.optionLeftTab === "history"
                ? common_store.changeLeftOption("")
                : common_store.changeLeftOption("history");
            }}
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: "#222222",
              borderRadius: "0",
              borderColor: "#1C1C1C",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            style={{
              backgroundImage:
                common_store.optionLeftTab === "history"
                  ? historyIcon.root
                  : historyIcon.active,
            }}
          />
        )}
        {!common_store.isPreview && (
          <IconButton
            data-testid="canvasHierarchyButton"
            onClick={() => {
              common_store.optionLeftTab === "hierarchy"
                ? common_store.changeLeftOption("")
                : common_store.changeLeftOption("hierarchy");
            }}
            sx={style.IconButton}
            style={{
              backgroundImage:
                common_store.optionLeftTab === "hierarchy"
                  ? hierarchyIcon.root
                  : hierarchyIcon.active,
            }}
          />
        )}
      </Box>
      <Box
        id="left"
        sx={{
          height: common_store.topSlide
            ? `calc(100vh - ${206}px)`
            : `calc(100vh - ${118}px)`,
          display: "flex",
          flexDirection: "row",
          left: "0%",
          bottom: "40px",
          position: "absolute",
          alignItems: "flex-start",
        }}
        onClick={(e) => {
          if (e.target.id === "TabHierarchy") {
            ObjectControllerVM.DeSelectAll();
          }
        }}
      >
        {/*{!common_store.isPreview &&*/}
        {/*  common_store.curCategory === "canvas" &&*/}
        {/*  common_store.optionLeftTab === "history" && <TabHistory />}*/}
        {/*{!common_store.isPreview &&*/}
        {/*  common_store.curCategory === "canvas" &&*/}
        {/*  common_store.optionLeftTab === "hierarchy" && <TabHierarchy />}*/}
      </Box>

      {!common_store.isPreview && (
        <Box
          sx={{
            height: common_store.topSlide
              ? `calc(100vh - ${166}px)`
              : `calc(100vh - ${78}px)`,
            display: "flex",
            flexDirection: "row",
            right: "0%",
            bottom: "0%",
            position: "absolute",
            alignItems: "flex-start",
          }}
        >
          {common_store.curCategory === "canvas" &&
            (object_store.selectedObjects.length !== 0 && !ObjectStateVM.Lock
              ? null
              : null)}
        </Box>
      )}
    </Box>
  );
});

export default MainPanel;

const style = {
  previewWrapper: {
    width: "100%",
    height: "100%",

    bottom: "0%",
    display: "flex",
    flexDirection: "column",
  },

  historyIconWrapper: {
    width: "80px",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    left: "0%",
    bottom: "0%",
    position: "absolute",
  },

  IconButton: {
    width: "40px",
    height: "40px",
    backgroundColor: "#222222",
    borderTopRightRadius: "8px",
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    cursor: "pointer",
  },
};
