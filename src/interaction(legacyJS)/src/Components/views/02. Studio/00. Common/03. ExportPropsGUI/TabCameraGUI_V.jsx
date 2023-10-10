import { Box, Typography, Checkbox } from "@mui/material";
import { observer } from "mobx-react";
import MxSlider from "../../02. RightTab/gui/Slider_V";
import { AccordionBtn } from "../../02. RightTab/gui/AccordionBtn_V";
import PropsCheckboxVM from "../../../../view_models/PropsCheckbox_VM";

const TabCamera = observer((props) => {
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AccordionBtn label={"카메라"} sx={style.boxWrapper}></AccordionBtn>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: "40px",
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
          {"Fov"}
        </Typography>

        <MxSlider
          sx={{
            mb: "30px",
            width: "60%",
          }}
          showLabel={false}
          disabled
        />

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState("cameraProps", "fov")}
          onChange={() =>
            PropsCheckboxVM().setCheckedState("cameraProps", "fov")
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
          height: "40px",
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
          {"near"}
        </Typography>

        <MxSlider
          sx={{
            mb: "30px",
            width: "60%",
          }}
          showLabel={false}
          disabled
        />

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState("cameraProps", "near")}
          onChange={() =>
            PropsCheckboxVM().setCheckedState("cameraProps", "near")
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
          height: "40px",
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
          {"Far"}
        </Typography>

        <MxSlider
          sx={{
            mb: "30px",
            width: "60%",
          }}
          showLabel={false}
          disabled
        />

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState("cameraProps", "far")}
          onChange={() =>
            PropsCheckboxVM().setCheckedState("cameraProps", "far")
          }
          sx={{
            "&.Mui-checked": {
              color: "#ffffff",
            },
          }}
        />
      </Box>
    </Box>
  );
});

export default TabCamera;

const style = {
  boxWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
};
