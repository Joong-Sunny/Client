import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { observer } from "mobx-react";
import * as Utils from "../../../../class/event-system/utils";
import { useCallback, useState } from "react";
import { exportGlbViewModel } from "../../../../view_models/ExportGlb_VM";

const TempButtonToDownloadProject = observer(() => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  async function getJSON() {
    return await exportGlbViewModel.exportJSON();
  }

  const saveJSON = (jsonData) => {
    const jsonString = Utils.stringify(jsonData);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const ele = document.createElement("a");
    ele.href = url;
    ele.download = `${text}.json`;
    ele.click();
    URL.revokeObjectURL(url);
  };

  const handleOk = async () => {
    const objectsData = await getJSON();
    const datas = Utils.copy({
      name: text,
      json: objectsData,
    });
    saveJSON(datas);
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleWheel = (e) => {
    e.stopPropagation();
  };

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          padding: "0px",
          width: "50px",
          height: "50px",
          borderRadius: 2,
          color: "#BBBBBB",
          "&:hover": {
            color: "#BBBB00",
            backgroundColor: "#444444",
          },
        }}
      >
        <div>
          <DownloadForOfflineIcon
            sx={{
              marginTop: "0.2em",
            }}
          />
          <Box fontWeight="bold" fontSize="0.1em">
            프로젝트
          </Box>
        </div>
      </IconButton>
      <Dialog
        maxWidth="md"
        open={open}
        onClose={handleClose}
        color="#80deea"
        background="#3a3a3a"
        PaperProps={{ sx: { backgroundColor: "#3a3a3a", color: "#FFFFFF" } }}
      >
        <DialogTitle>Project JSON 다운로드</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
              "& .MuiTextField-root": { m: 1, width: "25ch" },

              "& label": {
                color: "#FFFFFF",
              },
              "& label.Mui-focused": {
                color: "#737373",
              },

              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#FFFFFF",
                },
                "&:hover fieldset": {
                  borderColor: "#737373",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#737373",
                },
              },
            }}
            onSubmit={handleSubmit}
            onWheel={handleWheel}
          >
            <Box
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 5,
              }}
            >
              <TextField
                label={"project 명 입력"}
                InputProps={{ style: { color: "white" } }}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "inherit" }} onClick={handleCancel}>
            취소
          </Button>
          <Button sx={{ color: "inherit" }} onClick={handleOk}>
            다운로드
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default TempButtonToDownloadProject;
