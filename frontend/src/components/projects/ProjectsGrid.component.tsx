import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { IProject } from "../../types/global.typing";
import moment from "moment";

const column: GridColDef[] = [
  { field: "name", headerName: "Name", width: 200, flex: 1 },
  { field: "description", headerName: "Description", width: 200, flex: 1 },
  {
    field: "dateCreated",
    headerName: "Creation Time",
    width: 200,
    flex: 1,
    renderCell: (params) => moment(params.row.dateJoined).format("YYYY-MM--DD"),
  },
  { field: "managerName", headerName: "Manager Name", width: 200, flex: 1 },
  {
    field: "",
    flex: 1,
    renderCell: (params) => {
      return (
        <Link
          to="/projects/details"
          state={{
            projectId: `${params.row.id}`,
            projectName: `${params.row.name}`,
            projectDescription: `${params.row.description}`,
          }}
        >
          Details
        </Link>
      );
    },
  },
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
        getRowHeight={() => "auto"}
      />
    </Box>
  );
};

export default ProjectsGrid;
