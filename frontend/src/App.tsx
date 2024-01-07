import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar.component";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "./components/custom linear progress/CustomLinearProgress.component";
//import Home from "./pages/home/Home.page";
const Home = lazy(() => import("./pages/home/Home.page"));
const Roles = lazy(() => import("./pages/roles/Roles.page"));

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roles">
              <Route index element={<Roles />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
