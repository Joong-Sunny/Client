import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { common_store } from "../../stores/Common_Store";

const MxLoading = observer(() => {
  if (!common_store.isLoading) return null;

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          bgcolor: "#3a3a3a",
          zIndex: "10000",
          width: "100vw",
          height: "100vh",
          opacity: 0.8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            opacity: 1,
          }}
          src="/Icons/Studio/MxLoading.gif"
          alt="loading"
        />
      </Box>
    </>
  );
});

export default MxLoading;
