import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ITicketHistory } from "../../types/global.typing";
import moment from "moment";

const column: GridColDef[] = [
  { field: "oldValue", headerName: "Old Value", width: 200 },
  { field: "newValue", headerName: "New Value", width: 200 },
  {
    field: "dateModified",
    headerName: "Modification Time",
    width: 200,
    renderCell: (params) =>
      moment(params.row.dateModified).format("YYYY-MM--DD"),
  },
  { field: "property", headerName: "Property", width: 200 },

  { field: "employeeName", headerName: "Employee Name", width: 200 },
];

interface ITicketHistoriesGridProps {
  data: ITicketHistory[];
}

const TicketHistoriesGrid = ({ data }: ITicketHistoriesGridProps) => {
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

export default TicketHistoriesGrid;
