import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ITicket } from "../../types/global.typing";
import moment from "moment";
import { Link } from "react-router-dom";

const column: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
  {
    field: "dateCreated",
    headerName: "Creation Time",
    width: 200,
    renderCell: (params) => moment(params.row.dateJoined).format("YYYY-MM--DD"),
  },
  { field: "priority", headerName: "Priority", width: 200 },
  { field: "projectId", headerName: "Project Id", width: 200 },
  { field: "projectName", headerName: "Project Name", width: 200 },
  {
    field: "",
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

const ProjectTicketsGrid = ({ data }: ITicketsGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="tickets-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default ProjectTicketsGrid;