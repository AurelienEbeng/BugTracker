import { useEffect, useState } from "react";
import "./employees.scss";
import httpModule from "../../helpers/http.module";
import { IEmployee } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import EmployeesGrid from "../../components/employees/EmployeesGrid.component";
import { useJwt } from "../../context/Jwt.context";

const Employees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();
  const jwt = useJwt();

  useEffect(() => {
    setLoading(true);
    if (Object.keys(jwt.user).length === 0 && jwt.user.constructor === Object) {
      redirect("/signin", { replace: true });
      return;
    }

    let jwtToken = jwt.user.jwtToken;

    httpModule
      .get<IEmployee[]>("/Employee/GetEmployees", {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content employees">
      <div className="heading">
        <h2>Employees</h2>
        <Button variant="outlined" onClick={() => redirect("/employees/add")}>
          <Add />
        </Button>
      </div>

      {loading ? (
        <CircularProgress size={100} />
      ) : employees.length === 0 ? (
        <h1>No Employee</h1>
      ) : (
        <EmployeesGrid data={employees} />
      )}
    </div>
  );
};

export default Employees;
