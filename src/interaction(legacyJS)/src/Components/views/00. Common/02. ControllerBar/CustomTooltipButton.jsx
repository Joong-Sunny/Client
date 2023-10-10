import { observer } from "mobx-react-lite";
import { Button, Tooltip, Box, ClickAwayListener } from "@mui/material";
import { controllerBarViewModel } from "../../../view_models/ContorllerBar_VM";

const CustomTooltipButton = observer(
  ({
    title,
    placement,
    disableRipple,
    id,
    onClickButton,
    condition,
    imgSrc1,
    imgSrc2,
    altText1,
    altText2,
    arrowUp,
  }) => {
    const handleTooltipOpen = () => {
      controllerBarViewModel.setOpenedControlBarTooltipId(id);
    };
    const handleTooltipClose = () => {
      controllerBarViewModel.setOpenedControlBarTooltipId(null);
    };

    return (
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          open={controllerBarViewModel.checkOpenedControlBarTooltip(id)}
          title={
            <Box onClick={(event) => event.stopPropagation()}>{title}</Box>
          }
          disableTouchListener={true}
          placement={placement}
          arrow
          componentsProps={{
            tooltip: {
              sx: style.tooltipStyles,
            },
            arrow: {
              sx: style.arrowStyles,
            },
          }}
        >
          <Button
            sx={style.buttonStyles}
            disableRipple={disableRipple}
            onClick={(event) => {
              event.stopPropagation();
              handleTooltipOpen();
              onClickButton();
            }}
          >
            {condition ? (
              <img src={imgSrc1} alt={altText1} />
            ) : (
              <img src={imgSrc2} alt={altText2} />
            )}
            {arrowUp && (
              <img
                src={"/legacyJS/Icons/Studio/icon_ArrowUp.svg"}
                alt={"arrowup"}
                width={8}
                height={8}
                style={{ marginRight: "6px" }}
              />
            )}
          </Button>
        </Tooltip>
      </ClickAwayListener>
    );
  }
);
export default CustomTooltipButton;

const style = {
  tooltipStyles: {
    color: "#fff",
    bgcolor: "#1D1D1D",
    // border: "1px solid #8B87FF",
    borderRadius: 3,
    bottom: "5px !important",
  },
  arrowStyles: {
    "&::before": {
      backgroundColor: "#1D1D1D",
      border: "1px solid #1D1D1D",
    },
  },
  buttonStyles: {
    padding: "0px",
    bgcolor: "#1f1f1f",
    minWidth: "36px",
    minHeight: "36px",
    height: "36px",
    "&:hover": {
      backgroundColor: "#1f1f1f",
      // Add any other hover styles you want here
    },
  },
};
