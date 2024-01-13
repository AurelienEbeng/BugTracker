import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ITicketComment } from "../../types/global.typing";
import moment from "moment";

const column: GridColDef[] = [
  { field: "message", headerName: "Message", width: 200 },
  { field: "commenterName", headerName: "Commenter Name", width: 200 },
  {
    field: "dateCreated",
    headerName: "Creation Time",
    width: 200,
    renderCell: (params) => moment(params.row.dateJoined).format("YYYY-MM--DD"),
  },
];

interface ITicketCommentGridProps {
  data: ITicketComment[];
}

const TicketCommentsGrid = ({ data }: ITicketCommentGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 200 }} className="tickets-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default TicketCommentsGrid;
