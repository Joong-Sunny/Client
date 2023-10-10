import React from "react";
import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { undo_store } from "../../../stores/Undo_Store";
import { useTranslation } from "react-i18next";

const TabHistoryList = observer((props) => {
  const { t } = useTranslation();
  const getPrimaryText = (object) => {
    if (object.data["mode"] === "add") {
      return `${t(object.data["name"])}_${t(object.data["mode"])}`;
    } else {
      return t(object.data["mode"]);
    }
  };

  return (
    <>
      <List sx={style.list}>
        {Array.from(undo_store.reDoArray).map((object, index) => {
          const onClickHandler = async () => {
            await undo_store.repeatReDo(index);
          };
          const buttonText = getPrimaryText(object);

          return (
            <ListItem key={index} sx={style.buttonWrapper}>
              <img src="/legacyJS/Icons/Studio/icon_표시.png" alt="icon_표시" />
              <ListItemButton
                sx={{
                  ...style.undoButton,
                  color: "#888",
                }}
                onClick={onClickHandler}
              >
                <Typography sx={{ fontSize: "12px" }}>{buttonText}</Typography>
              </ListItemButton>
            </ListItem>
          );
        })}

        {Array.from(undo_store.unDoArray)
          .map((object, index) => {
            const onClickHandler = async () => {
              await undo_store.repeatUnDo(index);
            };
            const buttonText = getPrimaryText(object);

            return (
              <ListItem key={index} sx={style.buttonWrapper}>
                <img
                  src="/legacyJS/Icons/Studio/icon_표시.png"
                  alt="icon_표시"
                />
                <ListItemButton sx={style.undoButton} onClick={onClickHandler}>
                  <Typography sx={{ fontSize: "12px" }}>
                    {buttonText}
                  </Typography>
                </ListItemButton>
              </ListItem>
            );
          })
          .reverse()}
      </List>
    </>
  );
});

export default TabHistoryList;
const style = {
  list: {
    padding: "8px 37px 8px 5px",
    overflow: "auto",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": { width: 0 },
  },
  buttonWrapper: {
    height: "30px",
    display: "flex",
    justifyContent: "flex-start",
  },
  undoButton: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: "500",
    color: "#fff",
    textAlign: "left",
    textTransform: "none",
  },
};
