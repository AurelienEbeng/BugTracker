import { Box } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { ITicketHistory } from "../../types/global.typing";
import moment from "moment";

const column: GridColDef[] = [
  { field: "oldValue", headerName: "Old Value", flex: 1 },
  { field: "newValue", headerName: "New Value", flex: 1 },
  {
    field: "dateModified",
    headerName: "Modification Time",
    flex: 1,
    renderCell: (params) =>
      moment(params.row.dateModified).format("YYYY-MM-DD"),
  },
  { field: "property", headerName: "Property", flex: 1 },

  { field: "employeeName", headerName: "Employee Name", flex: 1 },
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

export default TicketHistoriesGrid;
