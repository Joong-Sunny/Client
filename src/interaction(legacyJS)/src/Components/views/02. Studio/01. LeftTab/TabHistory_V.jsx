import React from "react";
import { Tabs, Box, Tab, Typography , createTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ThemeProvider } from "@mui/material/styles";
import TabLeftPanel from "./TabLeftPanels_V";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // replace with your desired primary color
    },
  },
});

const TabHistory = observer((props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id="TabHistory" sx={style.boxWrapper}>
      <Box sx={style.textAreaWrapper}>
        <Typography sx={style.textArea}>히스토리</Typography>
      </Box>
      <Box sx={style.themeWrapper}>
        <ThemeProvider theme={theme}>
          <Tabs sx={style.tabs} value={value} onChange={handleChange}>
            <Tab
              sx={{
                minWidth: "70px",
                width: "70px",
              }}
              label={"캔버스"}
            />
            <Tab
              disabled
              sx={{
                minWidth: "130px",
                width: "130px",
              }}
              label={"인터렉션 에디터"}
            />
          </Tabs>
        </ThemeProvider>
      </Box>
      <Box>
        <TabLeftPanel value={value} index={0} />
      </Box>
    </Box>
  );
});
export default TabHistory;

const style = {
  boxWrapper: {
    zIndex: 1300,
    width: "285px",
    height: "100%",
    backgroundColor: "#282828",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
    "&::-webkit-scrollbar": { width: 0 },
  },

  textAreaWrapper: {
    width: "253px",
    display: "flex",
    alignItems: "center",
    mt: "20px",
  },

  textArea: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "14px",
    fontWeight: 500,
    color: "#fff",
  },

  themeWrapper: {
    width: "253px",
    display: "flex",
    borderColor: "#282828",
    borderBottom: 1,
    flexDirection: "row",
    alignItems: "center",
    mt: "20px",
  },

  tabs: {
    width: "100%",
    minHeight: "100%",
    height: "100%",
    "& .MuiTab-root": {
      mt: -1,
      color: "#959595",
      minHeight: "100%",
      fontFamily: "SpoqaHanSansNeo",
      fontSize: "13px",
    },
    "& .Mui-selected": { color: "#fff" },
  },
};
