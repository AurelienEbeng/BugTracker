import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { Menu, LightMode, DarkMode } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.context";
import { useSidebarContext } from "../../context/sidebar.context";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import NotificationsIcon from '@mui/icons-material/Notifications';

const links = [
  { href: "/logout", label: "Logout" },
];
const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const ToggleOpenMenu = () => {
    setOpen((prevState) => !prevState);
  };
  const menuStyles = open ? "menu open" : "menu";
  const sidebarContext = useSidebarContext();
  return (
    <div className="navbar">
      <div className="brand">
        <span>Bug Tracker</span>
      </div>
      <div className="notifications">
        <NotificationsIcon />
        <div className="counter">3</div>
      </div>
      <div className={menuStyles}>
        <ul>
          {links.map((item) => (
            <li key={item.href} onClick={ToggleOpenMenu}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hamburger">
        <Menu onClick={ToggleOpenMenu} />
      </div>
      <div className="sidebarIcon">
        <ViewSidebarIcon onClick={sidebarContext.toggleSidebarState} />
      </div>
      <div className="toggle">
        <ToggleButton
          value={"check"}
          selected={darkMode}
          onChange={toggleDarkMode}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </ToggleButton>
      </div>
    </div>
  );
};

export default Navbar;
