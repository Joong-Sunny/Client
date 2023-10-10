// Scene 세팅 "디스플레이" Props 내보내기 탭
import { observer } from "mobx-react";
import { Box, Typography, Checkbox } from "@mui/material";
import { AccordionBtn } from "../../02. RightTab/gui/AccordionBtn_V";
import PropsCheckboxVM from "../../../../view_models/PropsCheckbox_VM";

const TabDisplay = observer((props) => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "0px",
          left: "0px",
          padding: "20px",
          width: "100%",
          height: "auto",
          backgroundColor: "#1e1e1e",
          borderRadius: "10px",
          zIndex: "1000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <AccordionBtn
            label={"배경 컬러"}
            sx={style.boxWrapper}
          ></AccordionBtn>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "11px",
                color: "#e2e2e2",
              }}
            >
              {"배경 컬러"}
            </Typography>

            <Checkbox
              checked={PropsCheckboxVM().getCheckedState("sceneProps", "color")}
              onChange={() =>
                PropsCheckboxVM().setCheckedState("sceneProps", "color")
              }
              sx={{
                "&.Mui-checked": {
                  color: "#ffffff",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              marginTop: "30px",
            }}
          ></Box>
          <AccordionBtn label={"그리드"} sx={style.boxWrapper}></AccordionBtn>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "11px",
                color: "#e2e2e2",
              }}
            >
              {"사각형 그리드"}
            </Typography>

            <Checkbox
              checked={PropsCheckboxVM().getCheckedState("sceneProps", "axis")}
              onChange={() =>
                PropsCheckboxVM().setCheckedState("sceneProps", "axis")
              }
              sx={{
                "&.Mui-checked": {
                  color: "#ffffff",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "11px",
                color: "#e2e2e2",
              }}
            >
              {"중심선 그리드"}
            </Typography>

            <Checkbox
              checked={PropsCheckboxVM().getCheckedState(
                "sceneProps",
                "wireframe"
              )}
              onChange={() =>
                PropsCheckboxVM().setCheckedState("sceneProps", "wireframe")
              }
              sx={{
                "&.Mui-checked": {
                  color: "#ffffff",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
});

export default TabDisplay;

const style = {
  boxWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
};
