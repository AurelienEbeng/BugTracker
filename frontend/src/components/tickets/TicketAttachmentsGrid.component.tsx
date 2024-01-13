import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ITicketAttachment } from "../../types/global.typing";

const column: GridColDef[] = [
  { field: "notes", headerName: "Notes", width: 200 },
  { field: "uploaderName", headerName: "Uploader Name", width: 200 },

  { field: "fileUrl", headerName: "File Url", width: 200 },
];

interface ITicketAttachmentsGridProps {
  data: ITicketAttachment[];
}

const TicketAttachmentsGrid = ({ data }: ITicketAttachmentsGridProps) => {
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

export default TicketAttachmentsGrid;
