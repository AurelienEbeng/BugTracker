import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

type UserRole = {
  email: string;
  username: string;
  roleName: string;
  name: string;
};

const column: GridColDef[] = [
  { field: "name", headerName: "Name", flex:1},
  { field: "email", headerName: "Email", flex:1 },
  { field: "roleName", headerName: "Role", flex:1},
];

type ManageUserRolesGridProps = {
  data: UserRole[];
};

const ManageUserRolesGrid = ({ data }: ManageUserRolesGridProps) => {
  const [dataWithId] = useState(() => {
    let list: any[] = [];
    let id = 1;
    data.map((obj) => {
      let item = { ...obj, id };
      id++;
      list.push(item);
    });
    return list;
  });
  return (
    <Box sx={{ width: "100%", height: 450 }} className="roles-grid">
      <DataGrid
        rows={dataWithId}
        columns={column}
        rowHeight={50}
        getRowId={(dataWithId) => dataWithId.id}
      />
    </Box>
  );
};

export default ManageUserRolesGrid;
