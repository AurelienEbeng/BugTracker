import { useState } from "react"
import AssignedPersonnelGrid from "../../components/manageAssignedPersonnel/AssignedPersonnelGrid"


const ManageAssignedPersonnel = () => {
  const [assignedPersonnel, setAssignedPersonnel]= useState([]);
  const [loading,setLoading]= useState<boolean>(false)
  return (
    <div><AssignedPersonnelGrid data={assignedPersonnel} /></div>
  )
}

export default ManageAssignedPersonnel