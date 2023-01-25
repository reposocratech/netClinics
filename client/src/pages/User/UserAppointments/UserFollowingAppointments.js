import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { NetClinicsContext } from '../../../context/NetClinicsProvider';

export const UserFollowingAppointments = () => {
  const [appointmentData, setAppointmentData] = useState();
    const [listMedics, setListMedics] = useState([]);
    const { user } = useContext(NetClinicsContext);
    useEffect(() => {
      if(!user.user_id) return
      axios
        .get(`http://localhost:4000/patient/getConfirmedAppointments/${user.user_id}`)
        .then((res)=>{
            // console.log(res.data);
            setAppointmentData(res.data);
        })
        .catch((err) => console.log(err));

      axios
        .get(`http://localhost:4000/patient/getMedicsName`)
        .then((res)=>{
            // console.log(res.data);
            setListMedics(res.data);
        })
        .catch((err) => console.log(err));
    }, [])

    const findMedicName = (id_medic) => {
      return listMedics?.find((el)=> {
         if(el.user_id === id_medic){
             return `${el.name} ${el.lastname}`
         }
     });
   }
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Nombre médico</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Dirección</th>
          <th>Cancelar cita</th>
          
        </tr>
      </thead>
      <tbody>
        {appointmentData?.map((appointment,i)=>{
            return(
                <tr key={i}>
                    <td>{findMedicName(appointment.user_medic_id)?.name} {findMedicName(appointment.user_medic_id)?.lastname}</td>
                    <td>{appointment.appointment_date}</td>
                    <td>{appointment.appointment_time}</td>
                    <td>{appointment.appointment_address}</td>
                    <td> <Button>Cancelar</Button> </td>
                    
                </tr>
            )
        })}
        
       
      </tbody>
    </Table>
  )
}
