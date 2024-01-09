import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { IProject } from "../../types/global.typing";
import moment from "moment";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "name", width: 200 },
  { field: "description", headerName: "Description", width: 200 },
  {
    field: "dateCreated",
    headerName: "Creation Time",
    width: 200,
    renderCell: (params) => moment(params.row.dateJoined).format("YYYY-MM--DD"),
  },
  { field: "managerName", headerName: "Manager Name", width: 200 },
];

interface IProjectGridProps {
  data: IProject[];
}

const ProjectsGrid = ({ data }: IProjectGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="projects-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default ProjectsGrid;
