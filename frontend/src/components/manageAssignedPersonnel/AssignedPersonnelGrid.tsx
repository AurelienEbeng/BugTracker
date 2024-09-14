import { Box, Button } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";

type ProjectMembers = {
  userId: string;
  username: string;
  email: string;
  roleName: string;
};
interface AssignedPersonnelProps {
  data: ProjectMembers[];
  handleBtnDelete: (memberId: any) => void;
}

const AssignedPersonnelGrid = ({
  data,
  handleBtnDelete,
}: AssignedPersonnelProps) => {
  const column: GridColDef[] = [
    { field: "username", headerName: "User Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "rolename", headerName: "Role", flex: 1 },
    {
      field: "",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="btns">
            <Button
              onClick={() => {
                handleBtnDelete(params.row.userId);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "100%", height: 450 }}>
      <DataGrid
        columns={column}
        rows={data}
        getRowId={(row) => row.userId}
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
