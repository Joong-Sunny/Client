import { Box } from "@mui/material";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import TabHDRI from "./TabHDRI_V";
import TabDisplay from "./TabDisplay_V";
import TabPost from "./TabPost_V";

const TabPanel = observer((props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{
        width: "253px",
      }}
      hidden={value !== index}
      {...other}
    >
      {value === 0 && <TabHDRI />}
      {value === 1 && <TabDisplay />}
      {value === 2 && <TabPost />}
    </Box>
  );
});

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default TabPanel;
