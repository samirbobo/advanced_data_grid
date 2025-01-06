// Imports
import { useEffect, useState } from "react";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  getEmployees,
} from "../APIs";
import EmployeeDialog from "../components/EmployeeDialog";
import DeleteEmployeeDialog from "../components/DeleteEmployeeDialog";
import EmployeeTable from "../components/EmployeeTable";

// Material UI
import { Delete, Edit } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";

// Translation
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import CustomSnackbar from "../components/CustomSnackbar";

const Employee = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [formData, setFormData] = useState(null);
  const [titleDialog, setTitleDialog] = useState("");
  const [isEditEmployee, setIsEditEmployee] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const { t } = useTranslation();

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenDeleteDialog = (id) => {
    setOpenDeleteDialog(true);
    setFormData(id);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenAlter = () => {
    setOpenAlert(true);
  };
  const handleCloseAlter = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleEditButton = (row) => {
    handleOpenDialog();
    setTitleDialog(t("employeeEditTitle"));
    setIsEditEmployee(true);
    setFormData(row);
  };

  const handleAddButton = () => {
    handleOpenDialog();
    setFormData(null);
    setTitleDialog(t("employeeAddTitle"));
    setIsEditEmployee(false);
  };

  const fetchEmployeesData = async () => {
    setLoadingData(true);
    try {
      const data = await getEmployees();
      setEmployeesData(data.DATA.REF_ID);
    } catch (error) {
      console.error("Failed to add employee:", error);
      setEmployeesData([]);
      handleOpenAlter();
    } finally {
      setLoadingData(false);
    }
  };

  const handleAddEmployee = async (formData) => {
    try {
      await addEmployee(formData);
      fetchEmployeesData();
    } catch (error) {
      console.error("Failed to add employee:", error);
      handleOpenAlter();
    }
  };

  const handleEditEmployee = async (formData) => {
    try {
      await editEmployee(formData);
      fetchEmployeesData();
    } catch (error) {
      console.error("Failed to edit employee:", error);
      handleOpenAlter();
    }
  };

  const handleDeleteEmployee = async (employeeID) => {
    try {
      setLoadingData(true);
      await deleteEmployee(employeeID);
      // Update data after deletion
      setEmployeesData((prev) =>
        prev.filter((emp) => emp.EMPLOYEE_ID !== employeeID)
      );
    } catch (error) {
      console.error("Failed to delete employee:", error);
      handleOpenAlter();
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchEmployeesData();
  }, []);

  const columns = [
    {
      field: "EMPLOYEE_ID",
      headerName: "EMPLOYEE_ID",
      align: "center",
      headerAlign: "center",
    },
    {
      field: i18n.language === "ar" ? "NAME_ONE" : "NAME_TWO",
      headerName: "Name",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "EMAIL",
      headerName: "Email",
      flex: 1,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "AGE",
      headerName: "age",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "JOINING_DATE",
      headerName: "Date",
      width: 150,
      align: "center",
      headerAlign: "center",
      valueFormatter: (params) => {
        const date = new Date(params);
        return date.toLocaleDateString();
      },
    },
    {
      field: "IS_ACTIVE_Y_N",
      headerName: "Active",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      display: "flex",
      width: 150,
      align: "center",
      headerAlign: "center",
      filterable: false,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              p: "5px",
              width: "99px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <IconButton
              aria-label="edit"
              onClick={() => {
                handleEditButton(params.row);
              }}
            >
              <Edit />
            </IconButton>

            <IconButton
              aria-label="delete"
              onClick={() => {
                handleOpenDeleteDialog(params.row.EMPLOYEE_ID);
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Container sx={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
        <Typography variant="h5" sx={{ mb: 4 }}>
          {t("employee")}
        </Typography>

        <EmployeeTable
          employeesData={employeesData}
          columns={columns}
          loadingData={loadingData}
          handleAddButton={handleAddButton}
        />

        {/* Dialog to add and edit employee */}
        {open && (
          <EmployeeDialog
            open={open}
            title={titleDialog}
            handleClose={handleCloseDialog}
            handleEmployee={
              isEditEmployee ? handleEditEmployee : handleAddEmployee
            }
            formData={formData}
          />
        )}

        {/* Dialog to confirm deleted employee */}
        <DeleteEmployeeDialog
          open={openDeleteDialog}
          handleClose={handleCloseDeleteDialog}
          handleDeleteEmployee={handleDeleteEmployee}
          formData={formData}
        />

        {/* Custom Alter */}
        <CustomSnackbar
          openAlert={openAlert}
          handleCloseAlter={handleCloseAlter}
        />
      </Container>
    </Box>
  );
};

export default Employee;
