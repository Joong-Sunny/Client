import { observer } from "mobx-react";
import { Box, Typography, Checkbox } from "@mui/material";
import { AccordionBtn } from "../../02. RightTab/gui/AccordionBtn_V";
import PropsCheckboxVM from "../../../../view_models/PropsCheckbox_VM";
import { props_store } from "../../../../stores/Props_store";

const TabConvert = observer((props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <AccordionBtn
        label={"트랜스포메이션"}
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
          {"위치 (X Y Z)"}
        </Typography>

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState(
            props_store.propsTypePageName,
            "position"
          )}
          onChange={() =>
            PropsCheckboxVM().setCheckedState(
              props_store.propsTypePageName,
              "position"
            )
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
          {"회전 (X Y Z)"}
        </Typography>

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState(
            props_store.propsTypePageName,
            "rotation"
          )}
          onChange={() =>
            PropsCheckboxVM().setCheckedState(
              props_store.propsTypePageName,
              "rotation"
            )
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
          {"크기 (X Y Z)"}
        </Typography>

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState(
            props_store.propsTypePageName,
            "scale"
          )}
          onChange={() =>
            PropsCheckboxVM().setCheckedState(
              props_store.propsTypePageName,
              "scale"
            )
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

export default TabConvert;

const style = {
  boxWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
};
