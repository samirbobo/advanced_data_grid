import axios from "axios";

const baseUrl =
  "https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom";

export const getEmployees = async () => {
  const response = await axios.get(`${baseUrl}/PrcEmployeeDataSel`);
  if (response.status === 200) {
    return response.data;
  }
};

export const addEmployee = async (formData) => {
  const response = await axios.post(`${baseUrl}/PrcEmployeeDataIns`, formData);
  if (response.status === 200) {
    return response.data;
  }
};

export const editEmployee = async (formData) => {
  const response = await axios.post(`${baseUrl}/PrcEmployeeDataUpd`, formData);
  if (response.status === 200) {
    return response.data;
  }
};

export const deleteEmployee = async (employeeID) => {
  const response = await axios.post(`${baseUrl}/PrcEmployeeDataDel`, {
    EMPLOYEE_ID: employeeID,
  });
  if (response.status === 200) {
    return response.data;
  }
};