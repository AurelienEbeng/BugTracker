import { useState } from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { Menu, LightMode, DarkMode } from "@mui/icons-material";
import { useJwt } from "../../context/Jwt.context";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupIcon from "@mui/icons-material/Group";
import ReorderIcon from "@mui/icons-material/Reorder";
import ViewListIcon from "@mui/icons-material/ViewList";
import PersonIcon from "@mui/icons-material/Person";
import { useSidebarContext } from "../../context/sidebar.context";

const links = [
  { href: "/", label: "Dashboard", icon: <DashboardIcon /> },
  { href: "/projects", label: "Manage Projects Users", icon: <GroupAddIcon /> },
  { href: "/roles", label: "Manage Role Assignment", icon: <GroupIcon /> },
  { href: "/", label: "My Projects", icon: <ReorderIcon /> },
  { href: "/", label: "My Tickets", icon: <ViewListIcon /> },
  { href: "/", label: "User Profile", icon: <PersonIcon /> },
];
const Sidebar = () => {
  const jwt = useJwt();
  const { openSidebarState } = useSidebarContext();
  const sidebar = openSidebarState ? "sidebar open" : "sidebar";

  return (
    <div className={sidebar}>
      <div className="head">
        <p>Welcome, {jwt.user.username}</p>
      </div>
      <hr />

      <div className="menu">
        <ul>
          {links.map((item) => (
            <li key={item.href}>
              <Link to={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
