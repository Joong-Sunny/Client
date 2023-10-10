import { Box, ListItemButton, Tooltip } from "@mui/material";
import { observer } from "mobx-react";
import useCustomTranslation from "../../../hooks/useCustomTranslation";
import HierachyBtnVM from "../../../view_models/05. Hierarchy/HierachyBtn_VM";
import { useState, useRef, useEffect } from "react";
import MxButton from "../../00. Common/gui/MxButton_V";
import { objectViewModel } from "../../../view_models/Object_VM";
import MxInput from "../02. RightTab/gui/MxInput";
import { ObjectControllerVM } from "../../../view_models/ObjectController_VM";
import { action } from "mobx";

const HierarchyListItem = observer((props) => {
  const t = useCustomTranslation();
  const { UIData, object, visited, depth } = props;
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const ref = useRef();
  const iconUrl = {
    Mesh: "icon_object.svg",
    Object: "icon_object.svg",
    Object3D: `${open ? "icon_그룹열기.svg" : "icon_그룹닫기.svg"}`,
    "3DAsset": `${open ? "icon_그룹열기.svg" : "icon_그룹닫기.svg"}`,
    Bone: "icon_object.svg",
    SkinnedMesh: `${open ? "icon_그룹열기.svg" : "icon_그룹닫기.svg"}`,
    Group: `${open ? "icon_그룹열기.svg" : "icon_그룹닫기.svg"}`,
    Light: `icon_light.png`,
    PerspectiveCamera: `icon_camera.svg`,
    lock: `${object.props["lock"] ? "icon_잠그기.svg" : "icon_잠금해제.svg"}`,
    visible: `${
      object.props["visible"] ? "icon_보이기.svg" : "icon_가리기.svg"
    }`,
  };
  const handleHover = (e, objecId) => {
    setHover(objecId);
  };
  const onClickHandler = (event) => {
    switch (event.detail) {
      case 1: {
        HierachyBtnVM.onClickHandler(object);
        break;
      }
      case 2: {
        setOpen(!open);
        break;
      }

      default: {
        break;
      }
    }
  };
  const onClickHandlerNameBox = (e) => {
    e.stopPropagation();
    if (e.detail === 1) {
      HierachyBtnVM.onClickHandler(object);
    }
    if (e.detail === 2) {
      if (!objectViewModel.IsSelectedByUUID(object.objecId)) {
        ObjectControllerVM.Select(object);
      }
      setDisabled(false);
    }
  };
  const onChangeHandler = action((e) => {
    object.name = e.target.value;
  });
  useEffect(() => {
    if (!disabled) {
      const inputElement = ref.current.querySelector("input");
      inputElement.focus();
    }
  }, [disabled]);
  return (
    <Box>
      <Tooltip
        title={t(object.name)}
        placement="bottom"
        arrow
        componentsProps={style.tooltipAndArrow()}
      >
        <ListItemButton
          sx={style.ListButtonStyle(object.objectId)}
          onContextMenu={(event) =>
            HierachyBtnVM.onContextMenuOpen(event, object)
          }
          onClick={onClickHandler}
          onMouseEnter={(e) => handleHover(e, object.objectId)}
          onMouseLeave={(e) => handleHover(e, null)}
        >
          <img
            src={"/Icons/Studio/" + iconUrl[object.type]}
            alt="icon_object"
            style={style.clipPathGroup(depth)}
          />
          <Box
            ref={ref}
            sx={{ width: `calc(100% - 76px - ${depth * 16 + 6}px)` }}
            onClick={onClickHandlerNameBox}
          >
            <MxInput
              value={t(object.name)}
              boxStyle={style.textArea(depth)}
              inputProps={{ disabled: disabled, id: "inputField" }}
              inputStyle={style.inputStyle}
              onChange={onChangeHandler}
              onBlur={() => {
                setDisabled(true);
              }}
            />
          </Box>
          <Box sx={style.BtnAreaBox(object.objectId, hover)}>
            <MxButton
              style={{ width: "16px", height: "16px" }}
              onClick={(e) => {
                HierachyBtnVM.LockBtnHandler(e, object);
              }}
            >
              <img
                src={"/legacyJS/Icons/Studio/" + iconUrl["lock"]}
                alt="lock"
              />
            </MxButton>
            <MxButton
              style={{ width: "16px", height: "16px" }}
              onClick={(e) => {
                HierachyBtnVM.HideBtnHandler(e, object);
              }}
              disabled={object.props["lock"]}
            >
              <img
                src={"/legacyJS/Icons/Studio/" + iconUrl["visible"]}
                alt="visible"
              />
            </MxButton>
          </Box>
        </ListItemButton>
      </Tooltip>
      {open &&
        UIData.children.length !== 0 &&
        UIData.children.map((childUIData) => (
          <HierarchyListItem
            key={childUIData.object.objectId}
            UIData={childUIData}
            object={objectViewModel.GetMetaObjectByObjectId(
              childUIData.objectId
            )}
            visited={visited}
            depth={childUIData.depth}
          />
        ))}
    </Box>
  );
});

export default HierarchyListItem;
const style = {
  ListButtonStyle: (objectId) => ({
    width: "100%",
    height: "32px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    p: 0,
    backgroundColor: `${
      objectViewModel.IsSelectedByUUID(objectId) ? "#303030" : "transparent"
    }`,
    "&:hover": {
      backgroundColor: "#303030",
    },
  }),
  BtnAreaBox: (objectId, hover) => ({
    position: "absolute",
    right: 0,
    display: `${
      objectId === hover || objectViewModel.IsSelectedByUUID(objectId)
        ? "flex"
        : "none"
    }`,
    width: "38px",
    justifyContent: "space-between",
  }),
  inputStyle: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    color: "#fff",
    textOverflow: "ellipsis",
  },
  textArea: (depth) => ({
    width: "100%",
    ml: "5px",
    backgroundColor: "transparent",
  }),
  clipPathGroup: (depth) => ({
    width: "16px",
    height: "16px",
    objectFit: "contain",
    marginLeft: `${depth * 16 + 6}px`,
  }),
  tooltip: {
    fontFamily: "Inter",
    fontSize: "12px",
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
