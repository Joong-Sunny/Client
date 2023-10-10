import { Box, Paper } from "@mui/material";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
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
