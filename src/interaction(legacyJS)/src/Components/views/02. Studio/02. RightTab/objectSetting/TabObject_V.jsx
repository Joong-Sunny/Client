import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import TabObjectProps from "./TabObjectProps_V";
import { objectViewModel } from "../../../../view_models/Object_VM";

const TabObject = observer((props) => {
  const { sx, ...other } = props;

  return (
    <>
      <Box
        id={props.name}
        sx={{
          width: "100%",
        }}
        {...other}
      >
        <TabObjectProps label={"트랜스포메이션"} />
        {objectViewModel.selectedObjects[0].type !== "Audio" && (
          <>
            {objectViewModel.selectedObjects[0].type ===
              "PerspectiveCamera" && <TabObjectProps label={"카메라"} />}
            {objectViewModel.selectedObjects[0].materialProps && (
              <TabObjectProps label={"머터리얼"} />
            )}
            {objectViewModel.selectedObjects[0].props["lightType"] && (
              <TabObjectProps label={"빛속성"} />
            )}
          </>
        )}

        {objectViewModel.selectedObjects[0].type === "Audio" && (
          <>
            <TabObjectProps label={"사운드"} />
          </>
        )}
      </Box>
    </>
  );
});

export default TabObject;
