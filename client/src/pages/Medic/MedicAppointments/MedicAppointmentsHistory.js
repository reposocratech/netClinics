import React, { useContext, useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead,TableRow } from "@mui/material";
import { NetClinicsContext } from '../../../context/NetClinicsProvider';
import axios from 'axios'
import './myDatesMedic.scss'

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
                <TableCell align="center">Especialidad</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {appointmentData?.map((appointment,i)=>{
                return(
                <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>

                  <TableCell align="center">
                  {appointment.user_patient_id}
                  </TableCell>

                  <TableCell align="center">{appointment.appointment_date}</TableCell>

                  <TableCell align="center">{appointment.appointment_time}</TableCell>

                  <TableCell align="center">{appointment.appointment_address}</TableCell>

                  <TableCell align="center">{appointment.appointment_commentary}</TableCell>

                </TableRow>)
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};
