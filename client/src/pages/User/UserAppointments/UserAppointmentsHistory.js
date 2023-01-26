import React, { useContext, useEffect, useState } from 'react'
import { Container } from "react-bootstrap";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead,TableRow } from "@mui/material";
import { NetClinicsContext } from '../../../context/NetClinicsProvider';
import axios from 'axios';
import './myDatesPatient.scss'

export const UserAppointmentsHistory = () => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [listMedics, setListMedics] = useState([]);
    const { user } = useContext(NetClinicsContext);


      useEffect(() => {
        if(!user.user_id) return
          axios
            .get(`http://localhost:4000/patient/getAppointmentHistory/${user.user_id}`)
            .then((res)=>{
                setAppointmentData(res.data);
            })
            .catch((err) => console.log(err));

          axios
            .get(`http://localhost:4000/patient/getMedicsName`)
            .then((res)=>{
                setListMedics(res.data);
            })
            .catch((err) => console.log(err));
            
      }, []);
      
          

      const findMedicName = (id_medic) => {
        return listMedics?.find((el)=> {
           if(el.user_id === id_medic){
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
                <TableCell align="center">Profesional</TableCell>
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
                  {findMedicName(appointment.user_medic_id)?.name} {findMedicName(appointment.user_medic_id)?.lastname}
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
