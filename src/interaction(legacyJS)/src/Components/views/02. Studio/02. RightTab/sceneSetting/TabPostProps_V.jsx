import { Box, Collapse, Divider } from "@mui/material";
import { observer } from "mobx-react-lite";
import Common_VM from "../../../../view_models/Common_VM";
import PropsCheckboxVM from "../../../../view_models/PropsCheckbox_VM";
import TabSSAOTemplate from "./accordionTab/TabSSAO_V";
import TabBloomTemplate from "./accordionTab/TabBloom_V";
import { AccordionBtn } from "../gui/AccordionBtn_V";

const TabPostProps = observer((props) => {
  const { sx, ...other } = props;
  const { open, AccordionHandler } = Common_VM();

  return (
    <>
      <Box id={props.name} sx={style.boxWrapper} {...other}>
        <AccordionBtn
          open={open}
          label={props.label}
          onChange={AccordionHandler}
        />
      </Box>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        {props.label === "명암 고급 효과" &&
          PropsCheckboxVM().getCheckedState("sceneProps", "ssao") && (
            <TabSSAOTemplate />
          )}
        {props.label === "반짝임 효과" &&
          PropsCheckboxVM().getCheckedState("sceneProps", "bloom") && (
            <TabBloomTemplate />
          )}
      </Collapse>
    </>
  );
});

export default TabPostProps;

const style = {
  boxWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },

  textArea: {
    fontFamily: "SourceHanSansKR",
    fontSize: "12px",
    fontWeight: 500,
    color: "#fff",
    textAlign: "left",
  },
};
