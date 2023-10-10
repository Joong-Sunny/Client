import { Box, Collapse } from "@mui/material";
import { observer } from "mobx-react-lite";
import Common_VM from "../../../../view_models/Common_VM";
import TabConvert from "./accordionTab/TabConvert_V";
import TabMaterial from "./accordionTab/TabMaterial_V";
import TabLight from "./accordionTab/TabLight_V";
import TabCamera from "./accordionTab/TabCamera_V";
import TabSound from "./accordionTab/TabSound_V";
import { AccordionBtn } from "../gui/AccordionBtn_V";
const TabObjectProps = observer((props) => {
  const { sx, ...other } = props;
  const { open, AccordionHandler } = Common_VM();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderBottom: "solid #1c1c1c 1px",
      }}
    >
      <Box
        id={props.name}
        sx={{
          width: "239px",
        }}
        {...other}
      >
        <AccordionBtn
          open={open}
          label={props.label}
          onChange={AccordionHandler}
        />
        <Collapse in={!open} timeout="auto" unmountOnExit>
          {props.label === "트랜스포메이션" && <TabConvert />}
          {props.label === "머터리얼" && <TabMaterial />}
          {props.label === "빛속성" && <TabLight />}
          {props.label === "카메라" && <TabCamera />}
          {props.label === "사운드" && <TabSound />}
        </Collapse>
      </Box>
    </Box>
  );
});

export default TabObjectProps;
