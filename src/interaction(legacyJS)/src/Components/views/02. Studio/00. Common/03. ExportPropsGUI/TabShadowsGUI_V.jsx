import { Box, Checkbox, Typography } from "@mui/material";
import { observer } from "mobx-react";
import MxSlider from "../../02. RightTab/gui/Slider_V";
import { AccordionBtn } from "../../02. RightTab/gui/AccordionBtn_V";
import PropsCheckboxVM from "../../../../view_models/PropsCheckbox_VM";

const TabShadow = observer((props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        marginTop: "30px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AccordionBtn label={"빛 속성"} sx={style.boxWrapper}></AccordionBtn>
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
          {"light color"}
        </Typography>

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState("lightProps", "color")}
          onChange={() =>
            PropsCheckboxVM().setCheckedState("lightProps", "color")
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
          marginTop: "30px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "11px",
            color: "#e2e2e2",
          }}
        >
          {"Intensity"}
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
          checked={PropsCheckboxVM().getCheckedState("lightProps", "intensity")}
          onChange={() =>
            PropsCheckboxVM().setCheckedState("lightProps", "intensity")
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
        <Box
          sx={{
            fontFamily: "Inter",
            color: "#e2e2e2",
          }}
        >
          <Typography
            sx={{
              fontSize: "10px",
            }}
          >
            {"Angle"}
          </Typography>
          <Typography
            sx={{
              fontSize: "8px",
            }}
          >
            {"(스포트라이트)"}
          </Typography>
        </Box>

        <MxSlider
          sx={{
            mb: "30px",
            width: "60%",
          }}
          showLabel={false}
          disabled
        />

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState("lightProps", "angle")}
          onChange={() =>
            PropsCheckboxVM().setCheckedState("lightProps", "angle")
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
        <Box
          sx={{
            fontFamily: "Inter",
            color: "#e2e2e2",
          }}
        >
          <Typography
            sx={{
              fontSize: "10px",
            }}
          >
            {"Penumbra"}
          </Typography>
          <Typography
            sx={{
              fontSize: "8px",
            }}
          >
            {"(스포트라이트)"}
          </Typography>
        </Box>

        <MxSlider
          sx={{
            mb: "30px",
            width: "60%",
          }}
          showLabel={false}
          disabled
        />

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState("lightProps", "penumbra")}
          onChange={() =>
            PropsCheckboxVM().setCheckedState("lightProps", "penumbra")
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

export default TabShadow;

const style = {
  boxWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
};
