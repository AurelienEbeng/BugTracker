import { Box } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";

type ProjectMembers = {
  userId: string;
  username: string;
  email: string;
  roleName: string;
};
interface AssignedPersonnelProps {
  data: ProjectMembers[];
}
const column: GridColDef[] = [
  { field: "username", headerName: "User Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "roleName", headerName: "Role", flex: 1 },
];

const AssignedPersonnelGrid = ({ data }: AssignedPersonnelProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }}>
      <DataGrid
        columns={column}
        rows={data}
        getRowId={(row) => row.id}
        getRowHeight={() => "auto"}
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 2,
          },
        }}
      />
    </Box>
  );
};

export default AssignedPersonnelGrid;
