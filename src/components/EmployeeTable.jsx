/* eslint-disable react/prop-types */
// Imports
import EmployeeToolbar from "./EmployeeToolbar";

// Material UI
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const EmployeeTable = ({
  employeesData,
  columns,
  loadingData,
  handleAddButton,
}) => {
  return (
    <Box sx={{ height: 480 }}>
      <DataGrid
        aria-label="Employee data table"
        aria-labelledby="employee-table-title"
        rows={employeesData}
        columns={columns}
        getRowId={(row) => row.EMPLOYEE_ID} // Define EMPLOYEE_ID as id
        loading={loadingData}
        pageSizeOptions={[15, 25, 35, 50, 100]}
        pagination
        initialState={{
          pagination: { paginationModel: { pageSize: 15, page: 0 } },
        }}
        slots={{
          toolbar: () => <EmployeeToolbar onAddClick={handleAddButton} />,
        }}
      />
    </Box>
  );
};

export default EmployeeTable;
