/* eslint-disable react/prop-types */
// Material UI
import { Snackbar, Alert } from "@mui/material";

// Translation
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const CustomSnackbar = ({ openAlert, handleCloseAlter }) => {
  const { t } = useTranslation();

  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={6000}
      onClose={handleCloseAlter}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: i18n.language === "ar" ? "right" : "left", // في اللغة العربية تكون في اليمين، وفي الإنجليزية في اليسار
      }}
    >
      <Alert
        severity="error"
        onClose={handleCloseAlter}
        variant="filled"
        sx={{
          "& .MuiAlert-icon": {
            marginRight: i18n.language === "ar" ? "0" : "12px",
            marginLeft: i18n.language === "ar" ? "12px" : "0",
          },
          "& .MuiAlert-action": {
            paddingRight: i18n.language === "ar" ? "16px" : "0",
            paddingLeft: i18n.language === "ar" ? "0" : "16px",
          },
        }}
      >
        {t("alterMessage")}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
