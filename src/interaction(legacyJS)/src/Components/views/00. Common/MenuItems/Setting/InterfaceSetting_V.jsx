import { Box, Button, IconButton, Typography } from "@mui/material";
import MxDialog from "../../gui/MxDialog_V";
import MxSelect from "../../gui/MxSelect_V";
import { useState } from "react";
import { InterfaceSettingVM } from "../../../../view_models/03. GNB/Interface_VM";
import MxColor from "../../../02. Studio/02. RightTab/gui/MxColor_V";
import { observer } from "mobx-react";

const InterfaceSetting = observer((props) => {
  const { open, onClose } = props;
  const itemsList = ["한국어", "영어"];
  const [value, setValue] = useState(0);
  const onChangeMenu = (e) => {
    setValue(e.target.value);
  };
  const InterfaceClose = () => {
    InterfaceSettingVM.RevertSetting();
    onClose();
  };
  const InterfaceBtnClose = () => {
    InterfaceSettingVM.onClickHandler();
    onClose();
  };
  return (
    <MxDialog
      open={open}
      onClose={InterfaceClose}
      style={{
        width: "316px",
        height: "291px",

        alignItems: "none",
      }}
    >
      <Box sx={style.TopBoxWrapper}>
        <Box sx={style.TopBoxStyle}>
          <Box sx={style.TitleBoxStyle}>
            <Typography sx={style.textArea}>인터페이스 설정</Typography>
            <IconButton
              sx={{
                ...style.iconButtonStyle,
                position: "absolute",
                mt: "1px",
                left: "50%",
                top: "50%",
                transform: `translate(-50%,-50%)`,
                "&:hover": {
                  backgroundColor: "#E2E2E2",
                },
              }}
              onClick={() => {
                InterfaceSettingVM.onInitCanvasBackgroundColor();
              }}
            >
              <img
                style={style.imgStyle}
                src={"/Icons/Studio/icon_init.png"}
                alt={"init"}
              />
            </IconButton>
          </Box>
          <IconButton sx={style.iconButtonStyle} onClick={InterfaceClose}>
            <img
              style={style.imgStyle}
              src={"/Icons/Studio/icon_close.png"}
              alt={"close"}
            />
          </IconButton>
        </Box>
      </Box>
      <Box sx={style.ContentBox}>
        <Box sx={style.languageBox}>
          <Typography sx={style.contentsTextArea}>언어</Typography>
          <MxSelect
            disabled
            selectStyle={{ position: "absolute", right: 0, width: "208px" }}
            itemList={itemsList}
            onChange={onChangeMenu}
            value={value}
          />
        </Box>
        <Box sx={style.backgroundBox}>
          <Box
            sx={{
              width: "85px",
              display: "flex",
              alignItems: "center",
              pb: 1,
            }}
          >
            <MxColor
              labelStyle={style.contentsTextArea}
              menuStyle={{
                top: 0,
                left: 0,
                "& .MuiPaper-root": {
                  height: "300px",
                },
              }}
              label={"배경색"}
              saturationSilder={false}
              brightnessSlider={false}
              color={InterfaceSettingVM.canvasBackgroundColor}
              onChange={InterfaceSettingVM.onChangeCanvasBackgroundColor}
              name={"changeCanvasBackgroundColor"}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={style.buttonBox}>
        <Button sx={style.buttonStyle} onClick={InterfaceBtnClose}>
          적용
        </Button>
      </Box>
    </MxDialog>
  );
});

export default InterfaceSetting;
const style = {
  TopBoxWrapper: {
    width: "100%",
    height: "60px",
    display: "flex",
    justifyContent: "center",
  },
  TopBoxStyle: {
    display: "flex",
    mt: "22px",
    width: "268px",
    height: "26px",
    alignItems: "center",
  },
  TitleBoxStyle: {
    width: "246px",
    height: "26px",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  textArea: {
    mt: 0.5,
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "16px",
    fontWeight: 500,
    textAlign: "left",
    color: "#fff",
  },
  iconButtonStyle: {
    margin: 0,
    padding: 0,
    minWidth: 0,
    minHeight: 0,
    width: "16px",
    height: "16px",
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
  ContentBox: {
    width: "100%",
    height: "162px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contentsTextArea: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "13px",
    fontWeight: "500",
    textAlign: "left",
    color: "#fff",
  },
  languageBox: {
    display: "flex",
    mt: "12.5px",
    width: "268px",
    height: "30px",

    alignItems: "center",
    position: "relative",
  },
  backgroundBox: {
    display: "flex",
    mt: "17.5px",
    width: "268px",
    height: "24px",

    alignItems: "center",
  },
  buttonBox: {
    width: "100%",
    height: `calc(${291}px - ${222}px)`,
    display: "flex",
    justifyContent: "center",
  },
  buttonStyle: {
    width: "268px",
    height: "32px",
    margin: 0,
    padding: 0,
    borderRadius: "6px",
    backgroundColor: "#d4ed3e",
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: "500",
    textAlign: "center",
    color: "#101728",
    "&:hover": {
      backgroundColor: "#d4ed3e",
    },
  },
};
