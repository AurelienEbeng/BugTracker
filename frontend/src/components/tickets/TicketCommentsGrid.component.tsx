import { Box } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { ITicketComment } from "../../types/global.typing";
import moment from "moment";

const column: GridColDef[] = [
  { field: "message", headerName: "Message", flex: 1 },
  { field: "commenterName", headerName: "Commenter Name", flex: 1 },
  {
    field: "dateCreated",
    headerName: "Creation Time",
    flex: 1,
    renderCell: (params) => moment(params.row.dateJoined).format("YYYY-MM-DD"),
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
        getRowHeight={()=>'auto'}
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 2,
          },
        }}
      />
    </Box>
  );
};

export default TicketCommentsGrid;
