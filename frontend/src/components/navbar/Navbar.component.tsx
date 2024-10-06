import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { Menu, LightMode, DarkMode } from "@mui/icons-material";
import { Button, ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.context";
import { useSidebarContext } from "../../context/sidebar.context";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface Notification {
  id: string;
  message: string;
  dateCreated: string;
  isRead: boolean;
  receiverId: string;
}
const links = [{ href: "/logout", label: "Logout" }];
const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const ToggleOpenMenu = () => {
    setOpen((prevState) => !prevState);
  };
  const menuStyles = open ? "menu open" : "menu";
  const sidebarContext = useSidebarContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  function handleRead() {
    setNotifications([]);
    setOpenNotification(!openNotification);
  }
  // getUnreadNotifications()
  return (
    <div className="navbar">
      <div className="brand">
        <span>Bug Tracker</span>
      </div>
      <div className="notificationsGroup">
        <NotificationsIcon
          onClick={() => setOpenNotification(!openNotification)}
        />
        {notifications.length > 0 && (
          <div
            className="counter"
            onClick={() => setOpenNotification(!openNotification)}
          >
            {notifications.length}
          </div>
        )}
        {openNotification && (
          <div className="notifications">
            {notifications.map((n) => {
              return <span className="notification">{n.message}</span>;
            })}
            <Button variant="outlined" onClick={handleRead}>
              Mark as read
            </Button>
          </div>
        )}
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
