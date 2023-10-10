// import { Box, Paper } from "@mui/material";
// import React from "react";
// import storeContainer from "../../../stores/storeContainer";
// import { observer } from "mobx-react-lite";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { grey } from "@mui/material/colors";
//
// const InteractionEditorLNB = observer(() => {
//   const { common_store } = storeContainer;
//
//   return (
//     <Box sx={style.interactionEditorPaperWrapper}>
//       <Paper
//         elevation={0}
//         onClick={() => {
//           if (common_store.curCategory === "event") {
//             common_store.changeTopSlide();
//           } else {
//             common_store.changeCategory("event");
//           }
//         }}
//         sx={style.interactionEditorPaper}
//       >
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <span
//             style={{
//               fontSize: 14,
//               color: common_store.curCategory === "event" ? "white" : "gray"
//             }}>
//             인터렉션 에디터
//           </span>
//           {common_store.curCategory === "event" && (
//             common_store.topSlide ? (
//               <KeyboardArrowUpIcon sx={{ color: grey[100], fontSize: 14 }} />
//             ) : (
//               <KeyboardArrowDownIcon sx={{ color: grey[100], fontSize: 14 }} />
//             )
//           )}
//         </div>
//       </Paper>
//     </Box>
//   );
// });
//
// export default InteractionEditorLNB;
//
// const style = {
//   interactionEditorPaper: {
//     width: "118px",
//     height: "30px",
//     backgroundColor: "transparent",
//     cursor: "pointer",
//   },
//   interactionEditorPaperWrapper: {
//     height: "30px",
//     width: "118px",
//     display: "flex",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     ml: "10px",
//   },
// };
