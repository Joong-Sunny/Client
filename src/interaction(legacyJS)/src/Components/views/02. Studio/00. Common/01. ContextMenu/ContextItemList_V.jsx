import { useState } from "react";
import { Paper, Typography, Divider, MenuItem, MenuList } from "@mui/material";
import { contextMenuViewModel } from "../../../../view_models/01. ContextMenu/ContextMenu_VM";
import { observer } from "mobx-react-lite";

const ContextItemList = observer(({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleMouseOver = (index) => setHoveredIndex(index);
  const handleMouseOut = () => setHoveredIndex(null);

  return (
    <Paper>
      <MenuList onClick={contextMenuViewModel.handleClickAway} sx={style.List}>
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index;

          return [
            <MenuItem
              onClick={item.handler}
              key={index}
              sx={style.ListItem(item.display)}
              disabled={item.disabled}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={handleMouseOut}
            >
              <Typography variant="subtitle1" sx={style.text(isHovered)}>
                {item.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={style.shortcutText(isHovered)}
              >
                {item.shortcut}
              </Typography>
            </MenuItem>,
            item.itemDivider && item.display === "flex" && (
              <Divider
                key={`${index}-divider`}
                variant="middle"
                sx={{ backgroundColor: "#393939" }}
              />
            ),
          ];
        })}
      </MenuList>
    </Paper>
  );
});
export default ContextItemList;

const style = {
  List: {
    borderRadius: "4px",
    backgroundColor: "#282828",
    padding: "0",
  },

  ListItem: (display) => ({
    width: "170px",
    height: "29px",
    display: display,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "4px",
    padding: "1px 15px 1px 15px",
    objectFit: "contain",
    borderRadius: "4px",
    backgroundColor: "#282828",
    ":hover": {
      backgroundColor: "#e1f853",
    },
  }),

  text: (isHovered) => ({
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: "SpoqaHanSansNeo",
    color: isHovered ? "#101728" : "#f5f5f5",
  }),

  shortcutText: (isHovered) => ({
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: "SpoqaHanSansNeo",
    color: isHovered ? "#101728" : "#535353",
  }),
};
