import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar.component";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "./components/custom linear progress/CustomLinearProgress.component";
import { useJwt } from "./context/Jwt.context";
import Sidebar from "./components/sidebar/Sidebar.component";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard.page"));
const Roles = lazy(() => import("./pages/roles/Roles.page"));
const AddRoles = lazy(() => import("./pages/roles/AddRoles.page"));
const Employees = lazy(() => import("./pages/employees/Employees.page"));
const AddEmployees = lazy(() => import("./pages/employees/AddEmployees.page"));
const Projects = lazy(() => import("./pages/projects/Projects.page"));
const AddProjects = lazy(() => import("./pages/projects/AddProjects"));
const DetailProjects = lazy(() => import("./pages/projects/DetailProjects"));
const Ticket = lazy(() => import("./pages/tickets/Ticket"));
const AddTicketAttachment = lazy(
  () => import("./pages/tickets/AddTicketAttachment.page")
);
const SignIn = lazy(() => import("./pages/signInSignOut/signIn.page"));
const Logout = lazy(() => import("./pages/signInSignOut/logout.page"));
const DemoUsersLogin = lazy(
  () => import("./pages/demoUser/demoUser.login.page")
);
const ManageUserRoles = lazy(
  () => import("./pages/manageUserRoles/ManageUserRoles.page")
);
const AddUserRoles = lazy(
  () => import("./pages/manageUserRoles/AddUserRoles.page")
);
const MyProjects = lazy(() => import("./pages/projects/MyProjects.page"));

const DetailProjectEdit = lazy(
  () => import("./pages/projects/DetailProjectEdit")
);

const AddTicket = lazy(() => import("./pages/tickets/AddTicket"));

const TicketDetailsEdit = lazy(
  () => import("./pages/tickets/TicketDetailsEdit")
);

const ManageAssignedPersonnel = lazy(
  () => import("./pages/manageAssignedPersonnel/ManageAssignedPersonnel")
);

const GetMyTickets=lazy(
  () => import("./pages/tickets/GetMyTickets")
);

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app";
  const jwt = useJwt();
  const frame = jwt.isLoggedIn() ? "frame loggedIn" : "frame";

  return (
    <div className={appStyles}>
      {jwt.isLoggedIn() && <Sidebar />}
      <div className={frame}>
        {jwt.isLoggedIn() && <Navbar />}

        <div className="wrapper">
          <Suspense fallback={<CustomLinearProgress />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/roles">
                <Route index element={<Roles />} />
                <Route path="add" element={<AddRoles />} />
              </Route>
              <Route path="/employees">
                <Route index element={<Employees />} />
                <Route path="add" element={<AddEmployees />} />
              </Route>
              <Route path="/projects">
                <Route index element={<Projects />} />
                <Route path="add" element={<AddProjects />} />
                <Route path="details" element={<DetailProjects />} />
                <Route path="ticket" element={<Ticket />} />
                <Route path="addAttachment" element={<AddTicketAttachment />} />
                <Route path="myProjects" element={<MyProjects />} />
                <Route path="details/edit" element={<DetailProjectEdit />} />
              </Route>
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/demoUsersLogin" element={<DemoUsersLogin />} />
              <Route path="/manageUserRoles">
                <Route index element={<ManageUserRoles />} />
                <Route path="add" element={<AddUserRoles />} />
              </Route>
              <Route
                path="/projects/details/addTicket"
                element={<AddTicket />}
              />
              <Route
                path="/projects/details/editTicket"
                element={<TicketDetailsEdit />}
              />
              <Route
                path="/projects/manageAssignedPersonnel"
                element={<ManageAssignedPersonnel />}
              />
              <Route path="/getMyTickets" element={<GetMyTickets />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;
