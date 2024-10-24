import { Box } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { IProject } from "../../types/global.typing";
import moment from "moment";
import "./projects-grid.scss";

const column: GridColDef[] = [
  { field: "name", headerName: "Name", width: 200, flex: 1 },
  { field: "description", headerName: "Description", width: 200, flex: 1 },
  {
    field: "dateCreated",
    headerName: "Creation Time",
    width: 200,
    flex: 1,
    renderCell: (params) => moment(params.row.dateCreated).format("YYYY-MM-DD"),
  },
  { field: "managerName", headerName: "Manager Name", width: 200, flex: 1 },
  {
    field: "",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="links">
          <Link
            to="/projects/details"
            state={{
              project: {
                id: `${params.row.id}`,
                name: `${params.row.name}`,
                description: `${params.row.description}`,
                dateCreated: `${params.row.dateCreated}`,
                managerName: `${params.row.managerName}`,
              },
            }}
          >
            Details
          </Link>
          <Link
            to="/projects/manageAssignedPersonnel"
            state={{
              project: {
                id: `${params.row.id}`,
                name: `${params.row.name}`,
              },
            }}
          >
            Manage Assigned Personnel
          </Link>
        </div>
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
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 2,
          },
        }}
      />
    </Box>
  );
};

export default ProjectsGrid;
