import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { IEmployee } from "../../types/global.typing";
import moment from "moment";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "name", width: 200 },
  { field: "email", headerName: "email", width: 200 },
  {
    field: "dateJoined",
    headerName: "Date Joined",
    width: 200,
    renderCell: (params) => moment(params.row.dateJoined).format("YYYY-MM--DD"),
    //renderCell: (params) => moment(params.row.dateJoined).fromNow(),
  },
  { field: "roleName", headerName: "Role Name", width: 200 },
];

interface IEmployeesGridProps {
  data: IEmployee[];
}

const EmployeesGrid = ({ data }: IEmployeesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="employees-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default EmployeesGrid;
