import { Dialog, Box, Typography, Button } from "@mui/material";
import { observer } from "mobx-react";

const Error = observer((props) => {
  const { open, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: style.dialog }}
      maxWidth="false"
    >
      <Box sx={style.dialogContents}>
        <Box sx={style.imgWrapper}>
          <img src="/Icons/Studio/icon_경고.png" alt="warn" />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "121px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={style.textArea}>
            이미 존재하는 컴포넌트 이름 입니다.
          </Typography>
        </Box>
        <Box sx={style.buttonWrapper}>
          <Button
            sx={style.button}
            onClick={async () => {
              props.onClose();
            }}
          >
            확인
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
});
export default Error;

const style = {
  dialog: {
    width: "350px",
    height: "280px",
    border: "solid 1px #222",
    backgroundColor: "#282828",
    borderColor: "rgba(34, 34, 34, 0.2)",
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
  textArea: {
    fontFamily: "SourceHanSansKR",
    fontSize: "16px",
    fontWeight: 500,
    userSelect: "none",
    color: "#f5f5f5",
  },
  dialogContents: {
    width: "260px",
    height: "200px",
  },
  imgWrapper: {
    width: "100%",
    height: "45px",
    display: "flex",
    justifyContent: "center",
  },
  buttonWrapper: {
    width: "100%",
    height: "45px",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "124px",
    height: "34px",
    minHeight: "34px",
    minWidth: "80px",
    borderRadius: "5px",
    backgroundColor: " #e3f853",
    fontFamily: "SourceHanSansKR",
    fontSize: "14px",
    fontWeight: 500,
    color: "#272748",
    "&:hover": {
      backgroundColor: "#e3f853",
    },
  },
};
