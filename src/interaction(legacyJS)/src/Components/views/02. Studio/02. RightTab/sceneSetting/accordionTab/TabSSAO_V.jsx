import { Box, Tooltip } from "@mui/material";
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { observer } from "mobx-react";
import  {ssaoViewModel} from "../../../../../view_models/02. SceneSetting/SceneSetting_VM";
import MxSwitch from "../../gui/Switch_V";

const TabSSAOTemplate = observer((props) => {
  return(
    <Box
      style={{height:"0px"}}
    >
    <MxSwitch
        style={style.ssaoToggle}
        onChange={() => {
          ssaoViewModel.onChangeSSAOToggle();
        }}
        checked={ssaoViewModel.ssaoToggle}
      />
      <Tooltip 
        title="방의 구석 부분과 틈 같은 곳을 어둡게 하여 더욱 자연스럽고 사실적인 느낌을 낼 수 있습니다."
        componentsProps={style.tooltipAndArrow()}
        arrow
        placement="bottom"
        >
          <HelpRoundedIcon
            style={style.questionMark}
          ></HelpRoundedIcon>
      </Tooltip>
    </Box>
  )

  // return (
  //   <Box
  //     sx={{
  //       width: "100%",
  //       display: "flex",
  //       flexDirection: "column",
  //       alignItems: "center",
  //     }}
  //   >
  //     <MxSwitch
  //       style={style.ssaoToggle}
  //       onChange={() => {
  //         ssaoViewModel.onChangeSSAOToggle();
  //       }}
  //       checked={ssaoViewModel.ssaoToggle}
  //     />
  //     {/* <MxCheckBox
  //       label={"SSAO"}
  //       checked={ssaoViewModel.ssaoToggle}
  //       onChange={() => {
  //         ssaoViewModel.onChangeSSAOToggle();
  //       }}
  //     />
  //     <MxSlider
  //       label={"강도"}
  //       value={ssaoViewModel.ssaoIntensity}
  //       onChange={ssaoViewModel.onChangeSSAOIntensity}

  //       onMouseDown={SceneSetting_VM().onMouseDown}
  //       onMouseUp={SceneSetting_VM().onMouseUp}
  //       min={0}
  //       max={50}
  //       step={0.1}
  //     />
  //     <MxSlider
  //       label={"Samples"}
  //       value={ssaoViewModel.SSAOsamples}
  //       onChange={ssaoViewModel.onChangeSSAOsamples}

  //       onMouseDown={SceneSetting_VM().onMouseDown}
  //       onMouseUp={SceneSetting_VM().onMouseUp}
  //       min={0}
  //       max={50}
  //       step={1}
  //     />
  //     <MxSlider
  //       label={"Rings"}
  //       value={ssaoViewModel.SSAOrings}
  //       onChange={ssaoViewModel.onChangeSSAOrings}

  //       onMouseDown={SceneSetting_VM().onMouseDown}
  //       onMouseUp={SceneSetting_VM().onMouseUp}
  //       min={0}
  //       max={20}
  //       step={1}
  //     />
  //     <MxSlider
  //       label={"Distance Threshold"}
  //       value={ssaoViewModel.SSAOdistanceThreshold}
  //       onChange={ssaoViewModel.onChangeSSAOdistanceThreshold}

  //       onMouseDown={SceneSetting_VM().onMouseDown}
  //       onMouseUp={SceneSetting_VM().onMouseUp}
  //       min={0}
  //       max={1}
  //       step={0.01}
  //     />
  //     <MxSlider
  //       label={"Distance Fall Off"}
  //       value={ssaoViewModel.SSAOdistanceFalloff}
  //       onChange={ssaoViewModel.onChangeSSAOdistanceFalloff}

  //       onMouseDown={SceneSetting_VM().onMouseDown}
  //       onMouseUp={SceneSetting_VM().onMouseUp}
  //       min={0}
  //       max={1}
  //       step={0.01}
  //     />
  //     <MxSlider
  //       label={"Range Threshold"}
  //       value={ssaoViewModel.SSAOrangeThreshold}
  //       onChange={ssaoViewModel.onChangeSSAOrangeThreshold}

  //       onMouseDown={SceneSetting_VM().onMouseDown}
  //       onMouseUp={SceneSetting_VM().onMouseUp}
  //       min={0}
  //       max={1}
  //       step={0.01}
  //     />
  //     <MxSlider
  //       label={"Range Fall Off"}
  //       value={ssaoViewModel.SSAOrangeFalloff}
  //       onChange={ssaoViewModel.onChangeSSAOrangeFalloff}

  //       onMouseDown={SceneSetting_VM().onMouseDown}
  //       onMouseUp={SceneSetting_VM().onMouseUp}
  //       min={0}
  //       max={1}
  //       step={0.01}
  //     />
  //     <MxSlider
  //       label={"Luminance Influence"}
  //       value={ssaoViewModel.SSAOluminanceInfluence}
  //       onChange={ssaoViewModel.onChangeSSAOluminanceInfluence}

  //       onMouseDown={SceneSetting_VM().onMouseDown}
  //       onMouseUp={SceneSetting_VM().onMouseUp}
  //       min={0}
  //       max={1}
  //       step={0.01}
  //     />
  //     <MxSlider
  //       label={"Radius"}
  //       value={ssaoViewModel.SSAOradius}
  //       onChange={ssaoViewModel.onChangeSSAOradius}

  //       onMouseDown={SceneSetting_VM().onMouseDown}
  //       onMouseUp={SceneSetting_VM().onMouseUp}
  //       min={0}
  //       max={50}
  //       step={1}
  //     />
  //     <MxSlider
  //       label={"Scale"}
  //       value={ssaoViewModel.SSAOscale}
  //       onChange={ssaoViewModel.onChangeSSAOscale}

  //       onMouseDown={SceneSetting_VM().onMouseDown}
  //       onMouseUp={SceneSetting_VM().onMouseUp}
  //       min={0}
  //       max={1}
  //       step={0.01}
  //     />
  //     <MxSlider
  //       label={"Bias"}
  //       value={ssaoViewModel.SSAObias}
  //       onChange={ssaoViewModel.onChangeSSAObias}

  //       onMouseDown={SceneSetting_VM().onMouseDown}
  //       onMouseUp={SceneSetting_VM().onMouseUp}
  //       min={0}
  //       max={1}
  //       step={0.01}
  //     />
  //     <MxSlider
  //       label={"Fade"}
  //       value={ssaoViewModel.SSAOfade}
  //       onChange={ssaoViewModel.onChangeSSAOfade}

  //       onMouseDown={SceneSetting_VM().onMouseDown}
  //       onMouseUp={SceneSetting_VM().onMouseUp}
  //       min={0}
  //       max={1}
  //       step={0.01}
  //     />  */}
  //   </Box>
  // );
  
});

export default TabSSAOTemplate;

const style = {
  ssaoToggle: {
    justifyContent: "flex-end",
    position: "relative",
    bottom: "22px",
    height: "0px"
  },
  questionIcon: {
    justifyContent: "flex-end",
    position: "relative",
    bottom: "0px",
    right: "-105px",
    top:'-40px',
    width: "35px",
    height: "0px",
    background:"grey", 
  },
  questionMark: {
    justifyContent: "flex-end",
    position: "relative",
    right: "-100px",
    top:"-34px",
    color:"grey"
  },

  tooltip: {
    color: "#e1f853",
    bgcolor: "#282828CC",
    border: "1px solid grey",
    borderRadius: 3,
    bottom: "5px !important",
  },
  arrow: {
    "&::before": {
      backgroundColor: "#282828CC",
      border: "1px solid grey",
    },
  },
  tooltipAndArrow: function () {
    return {
      tooltip: {
        sx: style.tooltip,
      },
      arrow: {
        sx: style.arrow,
      },
    };
  },
}