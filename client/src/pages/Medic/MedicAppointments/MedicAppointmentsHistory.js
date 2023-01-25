import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { NetClinicsContext } from '../../../context/NetClinicsProvider';

export const MedicAppointmentsHistory = () => {
    const [appointmentData, setAppointmentData] = useState();
    const { user } = useContext(NetClinicsContext);
    const medic_id = user.user_id
    
    useEffect(() => {
      axios
        .get(`http://localhost:4000/medic/getAppointmentHistory/${medic_id}`)
        .then((res)=>{
            // console.log(res.data);
            setAppointmentData(res.data)
        })
        .catch((err) => console.log(err));
    }, [])
    
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Nombre paciente</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Dirección</th>
          <th>Especialidad</th>
        </tr>
      </thead>
      <tbody>
        {appointmentData?.map((appointment,i)=>{
            return(
                <tr key={i}>
                    <td>{appointment.user_patient_id}</td>
                    <td>{appointment.appointment_date}</td>
                    <td>{appointment.appointment_time}</td>
                    <td>{appointment.appointment_address}</td>
                    <td>{appointment.appointment_commentary}</td>
                </tr>
            )
        })}
        
       
      </tbody>
    </Table>
  )
}
