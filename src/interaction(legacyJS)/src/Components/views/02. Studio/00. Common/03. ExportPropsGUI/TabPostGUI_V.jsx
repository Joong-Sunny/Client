// Scene 세팅 "포스트 효과" Props 내보내기 탭
import { observer } from "mobx-react";
import { Box, Typography, Checkbox } from "@mui/material";
import { AccordionBtn } from "../../02. RightTab/gui/AccordionBtn_V";
import PropsCheckboxVM from "../../../../view_models/PropsCheckbox_VM";

const TabPost = observer((props) => {
  return (
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <AccordionBtn label={"효과"} sx={style.boxWrapper}></AccordionBtn>

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
            {"명암 고급 효과"}
          </Typography>

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState("sceneProps", "ssao")}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("sceneProps", "ssao")
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
            {"반짝임 효과"}
          </Typography>

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState("sceneProps", "bloom")}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("sceneProps", "bloom")
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
  );
});

export default TabPost;

const style = {
  boxWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
};
