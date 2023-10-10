import { observer } from "mobx-react";
import { Box, Divider, MenuItem } from "@mui/material";
const Help = observer((props) => {
  const { handleCloseMenu } = props.commonVmProps;
  return (
    <>
      <MenuItem
        onClick={() => {
          window.open(
            "https://stealth-newsstand-911.notion.site/MX-0b6195443ec14df6b8d1ab40d133771a?pvs=4"
          );
          handleCloseMenu();
        }}
        disableRipple
      >
        사용 안내서
      </MenuItem>
      <MenuItem disabled onClick={handleCloseMenu} disableRipple>
        새로운 기능
      </MenuItem>
      <MenuItem
        onClick={() => {
          window.open(
            "https://docs.google.com/spreadsheets/d/1GjHfGpiE8lPweiAyt8IkrVQEeN6PH3Jjc7ziAsLM8KE/edit?usp=sharing"
          );
          handleCloseMenu();
        }}
        disableRipple
      >
        오류 보고/개선 제안
      </MenuItem>

      <Divider sx={{ width: "158px", my: 0.5, backgroundColor: "#535353" }} />

      <Box
        sx={{
          fontFamily: "SourceHanSansKR",
          fontSize: "10px",
          textAlign: "center",
          color: "#959595",
        }}
        disabled
      >
        Copyright 2023 TmaxMetaverse
      </Box>
    </>
  );
});
export default Help;
