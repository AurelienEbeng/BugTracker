import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ITicketAttachment } from "../../types/global.typing";
import { PictureAsPdf } from "@mui/icons-material";
import httpModule from "../../helpers/http.module";
import { useJwt } from "../../context/Jwt.context";

interface ITicketAttachmentsGridProps {
  data: ITicketAttachment[];
}

const TicketAttachmentsGrid = ({ data }: ITicketAttachmentsGridProps) => {
  const jwt = useJwt();
  const handleDownload = (fileName: string) => {
    httpModule
      .get(`/TicketAttachment/download/${fileName}`, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
        responseType: "blob",
      })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        const a = document.createElement("a");
        a.href = url;
        console.log(a);
        a.download = fileName;
        a.style.display = "none";
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        alert("Error, check console");
        console.log(error.response);
      });
  };

  const column: GridColDef[] = [
    { field: "notes", headerName: "Notes", width: 200 },
    { field: "uploaderName", headerName: "Uploader Name", width: 200 },

    {
      field: "fileUrl",
      headerName: "Download",
      width: 150,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleDownload(params.row.fileUrl)}>
            <PictureAsPdf />
          </Button>
        );
      },
    },
  ];
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
