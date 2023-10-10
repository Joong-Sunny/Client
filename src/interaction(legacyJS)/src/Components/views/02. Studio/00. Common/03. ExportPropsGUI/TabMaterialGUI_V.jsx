import { observer } from "mobx-react";
import { Box, Typography, Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MxSlider from "../../02. RightTab/gui/Slider_V";
import { AccordionBtn } from "../../02. RightTab/gui/AccordionBtn_V";
import PropsCheckboxVM from "../../../../view_models/PropsCheckbox_VM";

const useStyles = makeStyles((theme) => ({
  icon: {
    fill: "red", // Set the desired color for the icon
  },
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
  },
  menuPaper: {
    maxHeight: "20vh",
    backgroundColor: "#393939",

    "&::-webkit-scrollbar": { width: 0 },
  },
}));

const TabMaterial = observer((props) => {
  const classes = useStyles();

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
      <AccordionBtn label={"머터리얼"} sx={style.boxWrapper}></AccordionBtn>
      
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Select
          disabled
          sx={{ ...style.SelectArea, width: "60%" }}
          MenuProps={{
            classes: { paper: classes.menuPaper, icon: classes.icon },
          }}
        />

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState(
            "objectProps",
            "materialSelect"
          )}
          onChange={() =>
            PropsCheckboxVM().setCheckedState("objectProps", "materialSelect")
          }
          sx={{
            "&.Mui-checked": {
              color: "#ffffff",
            },
          }}
        />
      </Box> */}

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
          {"머터리얼 요소 편집"}
        </Typography>

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState(
            "objectProps",
            "materialType"
          )}
          onChange={() =>
            PropsCheckboxVM().setCheckedState("objectProps", "materialType")
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
          {"기본 컬러"}
        </Typography>

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState("objectProps", "color")}
          onChange={() =>
            PropsCheckboxVM().setCheckedState("objectProps", "color")
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
          width: "100%",
        }}
      >
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
            {"금속성"}
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
            checked={PropsCheckboxVM().getCheckedState(
              "objectProps",
              "metalness"
            )}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("objectProps", "metalness")
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
            {"거칠기"}
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
            checked={PropsCheckboxVM().getCheckedState(
              "objectProps",
              "roughness"
            )}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("objectProps", "roughness")
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
            {"더블사이드"}
          </Typography>

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState(
              "objectProps",
              "doubleSide"
            )}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("objectProps", "doubleSide")
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
export default TabMaterial;

const style = {
  SelectArea: {
    mt: 1,
    width: "100%",
    height: "30px",
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: 500,
    textAlign: "left",

    backgroundColor: "#393939",
    color: "#e2e2e2",
    mb: 1,
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline ": {
      border: "none",
    },
    "& .MuiSvgIcon-root": {
      color: "#e2e2e2",
    },
  },
  MenuItemArea: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: 500,
    textAlign: "left",
    color: "#fff",

    "&:hover": {
      backgroundColor: "#535353",
    },
  },

  boxWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
};
