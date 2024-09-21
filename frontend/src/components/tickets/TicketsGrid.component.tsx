import { Box } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { ITicket } from "../../types/global.typing";
import moment from "moment";
import { Link } from "react-router-dom";

const column: GridColDef[] = [
  { field: "title", headerName: "Title", flex:1 },
  {
    field: "dateCreated",
    headerName: "Creation Time",
    renderCell: (params) => moment(params.row.dateCreated).format("YYYY-MM-DD"),
    flex:1
  },
  { field: "assignedDeveloperName", headerName: "Assigned Developer", flex:1 },
  {field: "creatorName", headerName:"Creator", flex:1},
  { field: "projectName", headerName: "Project Name", flex:1 },
  {
    field: "",
    flex:1,
    renderCell: (params) => {
      return (
        <Link
          to="/projects/ticket"
          state={{
            ticketId: `${params.row.id}`,
          }}
        >
          Details
        </Link>
      );
    },
  },
];

interface ITicketsGridProps {
  data: ITicket[];
}

const TicketsGrid = ({ data }: ITicketsGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="tickets-grid">
      <DataGrid
        rows={data}
        columns={column}
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

export default TicketsGrid;
