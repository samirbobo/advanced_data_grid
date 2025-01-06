/* eslint-disable react/prop-types */
// Imports
import { useState } from "react";
import i18n from "../i18n";

// Material UI
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, useTheme } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// Translation
import { useTranslation } from "react-i18next";

// Custom Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DeleteEmployeeDialog({
  open,
  handleClose,
  handleDeleteEmployee,
  formData,
}) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await handleDeleteEmployee(formData);
      handleClose();
    } catch (error) {
      console.error("Failed to delete employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          "& .MuiPaper-root": {
            width: "90vw",
            maxWidth: 500,
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: theme.palette.bg.main,
            m: 0,
            p: 2,
            direction: i18n.language === "ar" ? "rtl" : "ltr",
          }}
          id="customized-dialog-title"
        >
          {t("employeeDeleteTitle")}
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: i18n.language === "ar" ? "90%" : "8px",
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.error.main, textAlign: "center", mb: 2 }}
          >
            {t("confirmMessage")}
          </Typography>

          <LoadingButton
            loading={loading}
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleDelete}
          >
            {t("delete")}
          </LoadingButton>
        </Box>
      </BootstrapDialog>
    </>
  );
}
