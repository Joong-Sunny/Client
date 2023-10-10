import { Box, Divider } from "@mui/material";
import { observer } from "mobx-react-lite";
import TabPostProps from "./TabPostProps_V";

const TabPost = observer((props) => {
  const { sx, ...other } = props;

  return (
    <>
      <Box
        id={props.name}
        sx={{
          pt: "10px",
          width: "100%",
        }}
        {...other}
      >
        <TabPostProps label={"명암 고급 효과"} />
        <Divider />
        <TabPostProps label={"반짝임 효과"} />
      </Box>
    </>
  );
});

export default TabPost;
