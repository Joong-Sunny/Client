import React from "react";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/system";
import { Dialog, Tabs, Tab } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TabConvert from "./03. ExportPropsGUI/TabConvertGUI_V";
import TabMaterial from "./03. ExportPropsGUI/TabMaterialGUI_V";
import TabShadow from "./03. ExportPropsGUI/TabShadowsGUI_V";
import TabCamera from "./03. ExportPropsGUI/TabCameraGUI_V";
import TabShapeProps from "./03. ExportPropsGUI/TabShapePropsGUI_V";
import { props_store } from "../../../stores/Props_store";
import MxSelect from "../../00. Common/gui/MxSelect_V";
import TabHDRI from "./03. ExportPropsGUI/TabHDRIGUI_V";
import TabDisplay from "./03. ExportPropsGUI/TabDisplayGUI_V";
import TabPost from "./03. ExportPropsGUI/TabPostGUI_V";

const PropsView = observer((props) => {
  const { open, onClose } = props;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog open={open} onClose={onClose}>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                margin: "10px 15px 0px 0px",
                color: "#fff",
              }}
            >
              <Box
                sx={{
                  "&:hover": { cursor: "pointer" },
                }}
                onClick={props_store.ToggleDialog}
              >
                X
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                padding: "0px 0px 10px 0px",
              }}
            >
              <MxSelect
                selectStyle={{
                  width: "60%",
                  right: "20px",
                }}
                itemList={props_store.itemsList}
                onChange={(e) =>
                  props_store.setPropsTypePageIndex(e.target.value)
                }
                value={props_store.propsTypePageIndex}
              />
            </Box>

              
              {/* 씬 Props */}
            {props_store.propsTypePageIndex === 0 && (
              <ThemeProvider theme={theme}>
                <Tabs
                  value={props_store.sceneTabPageIndex}
                  onChange={(event, newValue) =>
                    props_store.setSceneTabPageIndex(newValue)
                  }
                  variant="fullWidth" // 탭의 너비를 전체 너비로 설정
                >
                  <Tab label={"환경광"} />
                  <Tab label={"디스플레이"} />
                  <Tab label={"포스트 효과"} />
                </Tabs>
              </ThemeProvider>
            )}

            <Box sx={style}>
              {props_store.propsTypePageIndex === 0 && (
                <Box>
                  {props_store.sceneTabPageIndex === 0 && <TabHDRI index={0} />}
                  {props_store.sceneTabPageIndex === 1 && (
                    <TabDisplay
                      value={props_store.sceneTabPageIndex}
                      index={1}
                    />
                  )}
                  {props_store.sceneTabPageIndex === 2 && (
                    <TabPost value={props_store.sceneTabPageIndex} index={2} />
                  )}
                </Box>
              )}
              
              {/* 오브젝트 Props */}
              {props_store.propsTypePageIndex === 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    padding: "20px",
                    width: "100%",
                    backgroundColor: "#1e1e1e",
                    borderRadius: "10px",
                    zIndex: "1000",
                  }}
                >
                  <TabConvert />
                  <TabMaterial />
                  <TabShapeProps />
                </Box>
              )}

              {/* 라이트 Props */}
              {props_store.propsTypePageIndex === 2 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    padding: "20px",
                    width: "100%",
                    backgroundColor: "#1e1e1e",
                    borderRadius: "10px",
                    zIndex: "1000",
                  }}
                >
                  <TabConvert />
                  <TabShadow />
                </Box>
              )}
              
              {/* 카메라 Props */}
              {props_store.propsTypePageIndex === 3 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    padding: "20px",
                    width: "100%",
                    backgroundColor: "#1e1e1e",
                    borderRadius: "10px",
                    zIndex: "1000",
                  }}
                >
                  <TabConvert />
                  <TabCamera />
                </Box>
              )}
            </Box>
          </Box>
        </Dialog>
      </ThemeProvider>
    </>
  );
});

export default PropsView;

const defaultTheme = createTheme();
const theme = createTheme(
  {
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            justifyContent: "space-around",
            backgroundColor: "#282828",
            opacity: "0.95",
            width: "60vh",
            borderRadius: "14px",

            "&::-webkit-scrollbar": { width: 0 },
          },
        },
      },

      MuiTabs: {
        styleOverrides: {
          root: {
            "& .MuiTab-root": {
              color: "#959595",
              fontFamily: "SourceHanSansKR",
              fontSize: "12px",
            },
            "& .Mui-selected": { color: "white" },
            "& .MuiTabs-indicator": {
              color: "#ffffff",
              backgroundColor: "white",
            },
          },
        },
      },
    },
  },
  defaultTheme
);

const style = {
  margin: "auto",
  padding: "20px",
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
  width: "45vh",
  height: "70vh",
  position: "relative",
  borderRadius: "10px",
};
