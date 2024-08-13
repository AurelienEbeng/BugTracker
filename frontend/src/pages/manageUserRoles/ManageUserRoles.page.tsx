import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useJwt } from '../../context/Jwt.context';
import httpModule from '../../helpers/http.module';
import ManageUserRolesGrid from '../../components/manageUserRoles/ManageUserRolesGrid';

type UserRole = {
    email: string,
    username: string,
    roleName: string,
}

const ManageUserRoles = () => {
    const [userRoles, setUserRoles] = useState<UserRole[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const redirect = useNavigate();
    const jwt = useJwt();
  
    useEffect(() => {
      setLoading(true);
      if (!jwt.isLoggedIn()) {
        redirect("/signin", { replace: true });
        return;
      }
  
      let jwtToken = jwt.user.jwtToken;
      httpModule
        .get<UserRole[]>("/Employee/GetManageUserRolesData", {
          headers: { Authorization: "Bearer " + jwtToken },
        })
        .then((response) => {
          setUserRoles(response.data);
          setLoading(false);
        })
        .catch((error) => {
          alert("Error");
          console.log(error);
          setLoading(false);
        });
    }, []);
    function Show(){
        console.log(userRoles)
    }
  
    return (
      <div className="content manageUserRoles">
        
  
        {loading ? (
          <CircularProgress size={100} />
        ) : userRoles.length === 0 ? (
          <h1>No User Roles</h1>
        ) : (
          <ManageUserRolesGrid data = {userRoles} />
        )}
      </div>
    );
  };

export default ManageUserRoles