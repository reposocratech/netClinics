import React, { useContext, useEffect, useState } from 'react'
import { Container } from "react-bootstrap";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead,TableRow } from "@mui/material";
import Avatar from "@mui/material/Avatar";
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
      {appointmentData?.length !== 0 ?
      <Container className="d-flex flex-column align-items-center p-5 mt-5">
        <TableContainer component={Paper} className="tableAppointmentHistory">
          <h3 className="title text-center my-4">Historial de citas</h3>
          <Table sx={{ minWidth: 390 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center">Profesional</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Hora</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {appointmentData?.map((appointment,i)=>{
                return(
                <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                  <div className="d-flex align-items-center justify-content-center">
                          <Avatar
                            alt="Remy Sharp"
                            
                            sx={{ width: 56, height: 56 }}
                          />
                        </div>
                  </TableCell>

                  <TableCell align="center">
                  <strong>{findMedicName(appointment.user_medic_id)?.lastname}, </strong>
                  {findMedicName(appointment.user_medic_id)?.name} 
                  </TableCell>

                  <TableCell align="center">{appointment.appointment_date}</TableCell>

                  <TableCell align="center">{appointment.appointment_time}</TableCell>
                </TableRow>)
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container> 
      :
      <Container className="withoutAppointments d-flex flex-column justify-content-center align-items-center my-5">
          <h3>Actualmente no tienes histórico de citas</h3>
      </Container>
      }
    </div>
  );
};
