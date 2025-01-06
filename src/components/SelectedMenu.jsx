/* eslint-disable react/prop-types */
import { ExpandMore } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SelectedMenu = ({ options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const { i18n } = useTranslation();

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    i18n.changeLanguage(index === 0 ? "en" : "ar"); // تغيير اللغة عند اختيار الخيار
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List component="nav" aria-label="Device settings" sx={{ p: 0, m: 0 }}>
        <ListItem
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
          sx={{
            "&:hover": { cursor: "pointer" },
            p: 0,
            gap: 0.5,
          }}
        >
          <ListItemText
            sx={{
              ".MuiTypography-root": {
                fontSize: "14px",
                color: theme.palette.text.primary,
              },
              m: 0,
              height: 15,
            }}
            secondary={options[selectedIndex].icon}
          />
          <ExpandMore fontSize="small" sx={{ color: "inherit" }} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            sx={{ fontSize: "14px", p: "3px 15px", minHeight: "10px" }}
            key={option.name}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText>{option.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default SelectedMenu;
