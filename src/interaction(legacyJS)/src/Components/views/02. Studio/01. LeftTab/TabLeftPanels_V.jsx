import { Box, Paper } from "@mui/material";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { common_store } from "../../../stores/Common_Store";
import CanvasHistoryList from "./CanvasHistoryList_V";
import TabHierarchyList from "./TabHierarchyList_V";
const TabLeftPanel = observer((props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{
        width: "253px",
      }}
      hidden={value !== index}
      {...other}
    >
      {value === 0 && common_store.optionLeftTab === "history" && (
        <CanvasHistoryList />
      )}
      {value === 0 && common_store.optionLeftTab === "hierarchy" && (
        <TabHierarchyList />
      )}
      {value === 1 && (
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "transparent",
            mt: "25vh",
            ml: "12%",
          }}
        >
          <img src="/Icons/Studio/Coming Soon.png" alt="Coming Soon" />
        </Paper>
      )}
    </Box>
  );
});

TabLeftPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
export default TabLeftPanel;
