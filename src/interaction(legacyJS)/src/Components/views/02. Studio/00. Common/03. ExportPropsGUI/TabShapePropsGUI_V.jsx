import { observer } from "mobx-react";
import { Box, Typography, Checkbox } from "@mui/material";
import MxSelect from "../../../00. Common/gui/MxSelect_V";
import { AccordionBtn } from "../../02. RightTab/gui/AccordionBtn_V";
import PropsCheckboxVM from "../../../../view_models/PropsCheckbox_VM";
import { data_store } from "../../../../stores/Data_Store";
import { props_store } from "../../../../stores/Props_store";

const TabShapeProps = observer((props) => {
  const primitiveList = [
    "cone",
    "cylinder",
    "sphere",
    "capsule",
    "torus",
    "plane",
  ];

  const shapeName = props_store.shapeName;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        marginTop: "30px",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AccordionBtn label={"쉐이프"} sx={style.boxWrapper}></AccordionBtn>
        <MxSelect
          selectStyle={{
            width: "40%",
            right: "20px",
          }}
          itemList={primitiveList}
          onChange={(e) => {
            props_store.setShape(e.target.value);
          }}
          value={props_store.shapeIndex}
        />
      </Box>

      {data_store[props_store.shapeName]?.map((el, index) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
            key={index}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "11px",
                color: "#e2e2e2",
              }}
            >
              {el[1]}
            </Typography>

            {/* PropsCheckbox_VM의 objectPropsInfo key값을 참조하기 위해 
            shapeType과 속성명 전처리 (예: cone의 radius 속성 => coneRadius) */}
            <Checkbox
              checked={PropsCheckboxVM().getCheckedState(
                "objectProps",
                props_store.shapeName +
                  el[0].charAt(0).toUpperCase() +
                  el[0].slice(1)
              )}
              onChange={() =>
                PropsCheckboxVM().setCheckedState(
                  "objectProps",
                  props_store.shapeName +
                    el[0].charAt(0).toUpperCase() +
                    el[0].slice(1)
                )
              }
              sx={{
                "&.Mui-checked": {
                  color: "#ffffff",
                },
              }}
            />
          </Box>
        );
      })}

      {/* <Box
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
          {"두께"}
        </Typography>

        <Checkbox
          checked={PropsCheckboxVM().getCheckedState(
            "objectProps",
            "thickness"
          )}
          onChange={() =>
            PropsCheckboxVM().setCheckedState("objectProps", "thickness")
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
              fontSize: "10px",
              color: "#e2e2e2",
            }}
          >
            {"세로 면 개수"}
          </Typography>

          <MxSlider
            sx={{
              mb: "30px",
              width: "50%",
            }}
            showLabel={false}
            disabled
          />

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState(
              "objectProps",
              "heightSegments"
            )}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("objectProps", "heightSegments")
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
              fontSize: "10px",
              color: "#e2e2e2",
            }}
          >
            {"가로 면 개수"}
          </Typography>

          <MxSlider
            sx={{
              mb: "30px",
              width: "50%",
            }}
            showLabel={false}
            disabled
          />

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState(
              "objectProps",
              "radialSegments"
            )}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("objectProps", "radialSegments")
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
            {"호 길이"}
          </Typography>

          <Checkbox
            checked={PropsCheckboxVM().getCheckedState("objectProps", "arc")}
            onChange={() =>
              PropsCheckboxVM().setCheckedState("objectProps", "arc")
            }
            sx={{
              "&.Mui-checked": {
                color: "#ffffff",
              },
            }}
          />
        </Box>
      </Box> */}
    </Box>
  );
});
export default TabShapeProps;

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
