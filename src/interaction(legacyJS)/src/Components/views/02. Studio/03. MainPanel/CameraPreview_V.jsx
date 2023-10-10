import { Box } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { observer } from "mobx-react";
import Camera_V from "./Camera_V";

const CameraPreview_V = observer((props) => {
  return (
    <>
      <Box
        border={3}
        borderColor="#FFFFFF"
        sx={{
          zIndex: 99999,
          bgcolor: "#3a3a3a",
          position: "absolute",
          left: "57%",
          top: "75%",
          width: "20%",
          height: "20%",
        }}
      >
        <Canvas
          style={{
            overflow: "hidden",
            width: "100%",
            height: "100%",
          }}
          flat
          sx={{}}
        >
          <Camera_V />
        </Canvas>
      </Box>
    </>
  );
});

export default CameraPreview_V;
