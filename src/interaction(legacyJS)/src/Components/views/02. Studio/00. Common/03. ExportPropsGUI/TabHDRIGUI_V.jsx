// Scene 세팅 "환경광" Props 내보내기 탭
import { Box, Typography, Checkbox } from "@mui/material";
import { AccordionBtn } from "../../02. RightTab/gui/AccordionBtn_V";
import PropsCheckboxVM from "../../../../view_models/PropsCheckbox_VM";
import { observer } from "mobx-react";

const TabHDRI = observer((props) => (
  <>
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
      {/* 환경이미지 Props*/}
      <AccordionBtn label={"환경이미지"} sx={style.boxWrapper}></AccordionBtn>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
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
            {"환경이미지"}
          </Typography>

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState("sceneProps", "image")}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("sceneProps", "image")
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
            {"환경강도"}
          </Typography>

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState("sceneProps", "intensity")}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("sceneProps", "intensity")
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
            {"회전"}
          </Typography>

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState("sceneProps", "rotation")}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("sceneProps", "rotation")
            }
            sx={{
              "&.Mui-checked": {
                color: "#ffffff",
              },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          marginTop: "30px",
        }}
      >
        {/* 주변광 Props*/}
        <AccordionBtn label={"주변광"} sx={style.boxWrapper}></AccordionBtn>
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
            {"강도"}
          </Typography>

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState("sceneProps", "ambientLightIntensity")}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("sceneProps", "ambientLightIntensity")
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
            {"컬러"}
          </Typography>

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState("sceneProps", "ambientLightColor")}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("sceneProps", "ambientLightColor")
            }
            sx={{
              "&.Mui-checked": {
                color: "#ffffff",
              },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          marginTop: "30px",
        }}
      >
        {/* 직사광 Props*/}
        <AccordionBtn label={"직사광"} sx={style.boxWrapper}></AccordionBtn>
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
            {"강도"}
          </Typography>

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState("sceneProps", "directionalLightIntensity")}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("sceneProps", "directionalLightIntensity")
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
            {"컬러"}
          </Typography>

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState("sceneProps", "directionalLightColor")}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("sceneProps", "directionalLightColor")
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
));

export default TabHDRI;

const style = {
  boxWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
};
