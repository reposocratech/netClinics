import React, { useContext, useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead,TableRow } from "@mui/material";
import { NetClinicsContext } from '../../../context/NetClinicsProvider';
import axios from 'axios'
import './myDatesMedic.scss'

export const MedicAppointmentsHistory = () => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [listPatients, setListPatients] = useState([]);
    const { user } = useContext(NetClinicsContext);
    
    useEffect(() => {
      if(!user.user_id) return
      axios
        .get(`http://localhost:4000/medic/getAppointmentHistory/${user.user_id}`)
        .then((res)=>{           
            setAppointmentData(res.data)
        })
        .catch((err) => console.log(err));
      axios
        .get(`http://localhost:4000/medic/getPatientsName`)
        .then((res)=>{
            setListPatients(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    const findPatientName = (id_patient) => {
      return listPatients?.find((el)=> {
         if(el.user_id === id_patient){
             return `${el.name} ${el.lastname}`
         }
      });
    }
    
  return (
    <div className="bgAppointmentHistory p-2">
      <Container fluid className="whiteBoxAppointmentHistory d-flex justify-content-center my-5">
        <TableContainer component={Paper} className="tableAppointmentHistory">
          <Table sx={{ minWidth: 390 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Paciente</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Hora</TableCell>
                <TableCell align="center">Dirección</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {appointmentData?.map((appointment,i)=>{
                return(
                <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>

                  <TableCell align="center">
                  {findPatientName(appointment.user_patient_id)?.name} {findPatientName(appointment.user_patient_id)?.lastname}
                  </TableCell>

                  <TableCell align="center">{appointment.appointment_date}</TableCell>

                  <TableCell align="center">{appointment.appointment_time}</TableCell>

                  <TableCell align="center">{appointment.appointment_address}</TableCell>

                </TableRow>)
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};
