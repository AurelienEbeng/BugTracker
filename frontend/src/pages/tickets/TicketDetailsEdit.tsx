import React from 'react'
import { useLocation } from 'react-router-dom'

const TicketDetailsEdit = () => {
    const location = useLocation()
    const {ticket} = location.state
    console.log(ticket)
  return (
    <div>Ticket Edit Details</div>
  )
}

export default TicketDetailsEdit