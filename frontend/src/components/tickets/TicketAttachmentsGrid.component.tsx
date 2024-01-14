import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ITicketAttachment } from "../../types/global.typing";
import { baseUrl } from "../../constants/url.constants";
import { PictureAsPdf } from "@mui/icons-material";

const column: GridColDef[] = [
  { field: "notes", headerName: "Notes", width: 200 },
  { field: "uploaderName", headerName: "Uploader Name", width: 200 },

  {
    field: "fileUrl",
    headerName: "Download",
    width: 150,
    renderCell: (params) => {
      return (
        <a
          href={`${baseUrl}/TicketAttachment/download/${params.row.fileUrl}`}
          download
        >
          <PictureAsPdf />
        </a>
      );
    },
  },
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
