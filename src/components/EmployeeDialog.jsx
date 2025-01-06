/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
// Imports
import { useForm } from "react-hook-form";
import { useState } from "react";
import i18n from "../i18n";

// Material UI
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, MenuItem, Stack, TextField, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
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

export default function EmployeeDialog({
  open,
  handleClose,
  title,
  handleEmployee,
  formData,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    // add EMPLOYEE_ID in case edit employee
    if (formData) {
      data = { EMPLOYEE_ID: formData.EMPLOYEE_ID, ...data };
    }

    try {
      setLoading(true);
      await handleEmployee(data);
      handleClose();
    } catch (error) {
      console.error("Failed to add employee:", error);
    } finally {
      setLoading(false);
    }
  };

  // regular expressions
  const regEmail =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const regArabicName = /^[\u0600-\u06FF\s]+$/;
  const regEnglishName = /^[a-zA-Z\s]+$/;

  const { t } = useTranslation();

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
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
          {title}
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right:
              i18n.language === "ar"
                ? {
                    xs: "80%", // في الشاشات الصغيرة (xs) باللغة العربية
                    sm: "90%", // في الشاشات الأكبر باللغة العربية
                  }
                : "8px", // في اللغة الإنجليزية
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
            <TextField
              defaultValue={formData?.NAME_ONE}
              error={Boolean(errors.NAME_ONE)}
              helperText={
                Boolean(errors.NAME_ONE)
                  ? "This field is required & min 3 character & Not English"
                  : null
              }
              {...register("NAME_ONE", {
                required: true,
                minLength: 3,
                pattern: regArabicName,
              })}
              sx={{ flex: "1" }}
              label="Name One"
              variant="outlined"
            />

            <TextField
              defaultValue={formData?.NAME_TWO}
              error={Boolean(errors.NAME_TWO)}
              helperText={
                Boolean(errors.NAME_TWO)
                  ? "This field is required & min 3 character & Not Arabic"
                  : null
              }
              {...register("NAME_TWO", {
                required: true,
                minLength: 3,
                pattern: regEnglishName,
              })}
              sx={{ flex: "1" }}
              label="Name Two"
              variant="outlined"
            />
          </Stack>

          <TextField
            defaultValue={formData?.EMAIL}
            error={Boolean(errors.EMAIL)}
            helperText={
              Boolean(errors.EMAIL)
                ? "Please provide a valid email address"
                : null
            }
            {...register("EMAIL", { required: true, pattern: regEmail })}
            label="Email"
            variant="outlined"
          />

          <TextField
            defaultValue={formData?.AGE}
            error={Boolean(errors.AGE)}
            helperText={
              Boolean(errors.AGE) ? "Please provide a valid age" : null
            }
            {...register("AGE", { min: 1, required: true })}
            label="Age"
            variant="outlined"
            type="number"
          />
          <TextField
            // convert date to mm/dd/yyyy
            defaultValue={formData?.JOINING_DATE?.split("T")[0]}
            error={Boolean(errors.JOINING_DATE)}
            helperText={
              Boolean(errors.JOINING_DATE) ? "This field is required" : null
            }
            {...register("JOINING_DATE", { required: true })}
            label="Date"
            variant="outlined"
            type="date"
          />

          <TextField
            defaultValue={formData?.IS_ACTIVE_Y_N || "Y"}
            {...register("IS_ACTIVE_Y_N")}
            variant="outlined"
            id="outlined-select-currency"
            select
            label="is_Active"
          >
            <MenuItem value={"Y"}>Y</MenuItem>
            <MenuItem value={"N"}>N</MenuItem>
          </TextField>

          <Box>
            <LoadingButton
              type="submit"
              variant="outlined"
              sx={{ width: "100%" }}
              loading={loading}
            >
              {t("submit")}
            </LoadingButton>
          </Box>
        </Box>
      </BootstrapDialog>
    </>
  );
}
