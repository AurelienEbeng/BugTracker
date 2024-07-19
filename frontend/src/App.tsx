import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar.component";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "./components/custom linear progress/CustomLinearProgress.component";
import { useJwt } from "./context/Jwt.context";
import Sidebar from "./components/sidebar/Sidebar.component";

const Home = lazy(() => import("./pages/home/Home.page"));
const Roles = lazy(() => import("./pages/roles/Roles.page"));
const AddRoles = lazy(() => import("./pages/roles/AddRoles.page"));
const Employees = lazy(() => import("./pages/employees/Employees.page"));
const AddEmployees = lazy(() => import("./pages/employees/AddEmployees.page"));
const Projects = lazy(() => import("./pages/projects/Projects.page"));
const AddProjects = lazy(() => import("./pages/projects/AddProjects"));
const DetailProjects = lazy(() => import("./pages/projects/DetailProjects"));
const DetailTicket = lazy(() => import("./pages/tickets/DetailTicket"));
const AddTicketAttachment = lazy(
  () => import("./pages/tickets/AddTicketAttachment.page")
);
const SignIn = lazy(() => import("./pages/signInSignOut/signIn.page"));
const Logout = lazy(() => import("./pages/signInSignOut/logout.page"));
const DemoUsersLogin = lazy(
  () => import("./pages/demoUser/demoUser.login.page")
);

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app";
  const jwt = useJwt();
  const frame= jwt.isLoggedIn() ? "frame loggedIn":"frame";;

  return (
    <div className={appStyles}>
      {jwt.isLoggedIn() && <Sidebar />}
      <div className={frame}>
        {jwt.isLoggedIn() && <Navbar />}

        <div className="wrapper">
          <Suspense fallback={<CustomLinearProgress />}>
            <Routes>
              <Route path="/" element={<Home />} />
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
                <Route path="ticket" element={<DetailTicket />} />
                <Route path="addAttachment" element={<AddTicketAttachment />} />
                {/* <Route path="ticket" element={<DetailTicket />}>
                you can * at the end of path for subcategories
                <Route
                  path=":addAttachment"
                  element={<AddTicketAttachment />}
                />
              </Route> */}
              </Route>
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/demoUsersLogin" element={<DemoUsersLogin />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;
