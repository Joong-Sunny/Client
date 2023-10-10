import React, { useEffect } from "react";
import { List } from "@mui/material";
import { observer } from "mobx-react-lite";
import HierachyVM from "../../../view_models/05. Hierarchy/Hierachy_VM";
import HierarchyListItem from "./HierachyListItem_V";
import { object_store } from "../../../stores/Object_Store";
import { reaction } from "mobx";
import { objectViewModel } from "../../../view_models/Object_VM";

const TabHierarchyList = observer(() => {
  useEffect(() => {
    const dispose = reaction(
      () => {
        return object_store.metaObjects;
      },
      () => {
        HierachyVM.HierachyListFilter();
      }
    );

    return () => {
      dispose();
    };
  }, []);
  useEffect(() => {
    HierachyVM.HierachyListFilter();
  }, [object_store.renderObjects]);
  return (
    <>
      {/*Hierarchy*/}
      <List sx={style.gridSx}>
        {objectViewModel.metaObjects.length !== 0 &&
          HierachyVM.hierachyList.map((UIData, index) => (
            <HierarchyListItem
              key={UIData.object.objectId}
              UIData={UIData}
              object={UIData.object}
              depth={0}
            />
          ))}
      </List>
    </>
  );
});

export default TabHierarchyList;

const style = {
  gridSx: {
    overflow: "auto",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": { width: 0 },
  },
  boxSx: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightClickBoxSx: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "253px",
    height: "30px",
  },
  nameBoxSx: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    borderRadius: "5px",
  },
  textFieldSx: {
    width: "67.00%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
  },
  textFieldInputProps: {
    fontFamily: "SpoqaHanSansNeo",
    fontWeight: "500",
    color: "#c4c4c4",
    backgroundColor: "#transparent",
    height: "24px",
    borderColor: "#e6e6e6",
    outlineColor: "#d4ed3e",
  },
  groupWrapper: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: "500",
    color: "#fff",
    overflow: "hidden",
    textOverflow: "ellipsis",
    pointerEvents: "none",
    ml: "3px",
  },
  groupAssetWrapper: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: "500",
    overflow: "hidden",
    textOverflow: "ellipsis",
    pointerEvents: "none",
    textAlign: "left",
  },
  IconButtonSx: {
    width: "16px",
    height: "16px",
    ml: "12px",
  },
  clipPathGroup: (groupId) => ({
    width: "16px",
    height: "16px",
    objectFit: "contain",
    marginLeft: `${typeof groupId !== "undefined" ? 24 : 0}px`,
    // marginLeft: `${(length - 1) * 18 + 6}px`,
  }),
};
