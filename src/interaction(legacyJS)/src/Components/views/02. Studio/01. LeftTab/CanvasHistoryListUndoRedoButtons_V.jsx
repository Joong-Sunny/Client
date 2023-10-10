import canvasHistory_Store from "../../../stores/CanvasHistory_Store";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import React from "react";

// Initial state button for undo history
export const InitialState = ({ arrayObject }) => {
  const object = { name: "InitialState", getDetailData: () => [], id: -1 };
  return (
    <UndoButton
      object={object}
      isTopUndoHistory={Array.from(arrayObject).length === 0}
    />
  );
};

// Specific button for undo actions
export const UndoButton = ({ object, isTopUndoHistory }) => {
  return (
    <HistoryButton
      object={object}
      color={isTopUndoHistory ? "#d4ed3e" : "#fff"}
      url={
        isTopUndoHistory
          ? "legacyJS/Icons/Studio/icon_표시_활성화"
          : "legacyJS/Icons/Studio/icon_표시"
      }
    />
  );
};

// Specific button for redo actions
export const RedoButton = ({ object }) => {
  return (
    <HistoryButton
      object={object}
      color="#aaa"
      url="/Icons/Studio/icon_비표시"
    />
  );
};

// Button with history action
const HistoryButton = observer(({ object, color, url }) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={object.name} placement="right">
      <Box sx={style.buttonWrapper}>
        <img src={`${url}.png`} alt={url} />
        <Button
          disableRipple
          sx={style.button}
          onClick={() => canvasHistory_Store.goToState(object.id)}
        >
          <Typography sx={{ fontSize: "12px", color: color }}>
            {t(object.name)}
          </Typography>
        </Button>
      </Box>
    </Tooltip>
  );
});

const style = {
  buttonWrapper: {
    boxSizing: "border-box",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  button: {
    fontFamily: "SourceHanSansKR",
    fontSize: "14px",
    fontWeight: "500",
    textAlign: "left",
    ml: "10px",
    textTransform: "none",
    padding: 0,
  },
};
