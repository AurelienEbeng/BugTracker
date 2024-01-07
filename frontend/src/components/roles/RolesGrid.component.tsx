import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { IRole } from "../../types/global.typing";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "name", width: 200 },
];

interface IRolesGridProps {
  data: IRole[];
}

const RolesGrid = ({ data }: IRolesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="roles-grid">
      <DataGrid rows={data} columns={column} getRowId={(row) => row.id} rowHeight={50}/>
    </Box>
  );
};

export default RolesGrid;
