// Imports
import i18n from "../i18n";

// Material UI
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { GridToolbar } from "@mui/x-data-grid";


const EmployeeToolbar = ({ onAddClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 1,
      }}
    >
      {/* Toolbar default actions */}
      <GridToolbar
        sx={{
          "& .MuiButtonBase-root": {
            "& .MuiButton-startIcon": {
              display: "inherit",
              marginRight: i18n.language === "ar" ? "0" : "8px",
              marginLeft: i18n.language === "ar" ? "8px" : "0",
            },
          },
        }}
      />

      {/* Add New Employee Button */}
      <Button
        variant="text"
        color="primary"
        startIcon={<Add />}
        onClick={onAddClick}
        sx={{
          px: "5px",
          py: "4px",
          "& .MuiButton-startIcon": {
            marginRight: i18n.language === "ar" ? "0" : "8px",
            marginLeft: i18n.language === "ar" ? "8px" : "0",
          },
        }}
      >
        Add New
      </Button>
    </Box>
  );
};

export default EmployeeToolbar;
