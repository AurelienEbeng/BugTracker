import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.scss";
import ThemeContextProvider from "./context/theme.context";
import { BrowserRouter } from "react-router-dom";
import JwtProvider from "./context/Jwt.context";
import SidebarProvider from "./context/sidebar.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeContextProvider>
    <JwtProvider>
      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
    </JwtProvider>
  </ThemeContextProvider>
);
