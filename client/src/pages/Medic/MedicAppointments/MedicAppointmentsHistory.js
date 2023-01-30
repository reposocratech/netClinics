import React, { useContext, useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead,TableRow } from "@mui/material";
import { NetClinicsContext } from '../../../context/NetClinicsProvider';
import axios from 'axios'
import './myDatesMedic.scss'
import { reverseDate } from '../../../Utils/reverseDatePicker/reverseDatePicker';
import { Button, Col, Container, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export const MedicAppointmentsHistory = () => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [listPatients, setListPatients] = useState([]);
    const { user, resetPage, setResetPage } = useContext(NetClinicsContext);
    
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
    }, [resetPage]);

    const findPatientName = (id_patient) => {
      return listPatients?.find((el)=> {
         if(el.user_id === id_patient){
             return `${el.name} ${el.lastname}`
         }
      });
    };

    const [searchDate, setSearchDate] = useState("");

  const handlerSearch = (e) => {
    setSearchDate(e.target.value);
  };

  const cleanSubmit = () => {
    setSearchDate("");
    setResetPage(!resetPage);
  };

  const onSubmit = () => {
    if (searchDate !== "") {
      setAppointmentData(
        appointmentData.filter((appointment) => {
          return appointment.appointment_date.includes(searchDate);
        })
      );
    } else {
      setAppointmentData(appointmentData);
    }
  };
    
  return (
    <div className="bgAppointmentHistory p-2">
      {appointmentData?.length !== 0 ?
      <Container fluid className="whiteBoxAppointmentHistory d-flex justify-content-center my-5">
        <Row>
            <div>
              <Col>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    <i className="fa-solid fa-user-doctor"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="dd/mm/aaaa"
                    name="searchDate"
                    type="date"
                    autoComplete="off"
                    aria-label="text"
                    aria-describedby="basic-addon1"
                    value={searchDate}
                    onChange={handlerSearch}
                  />
                </InputGroup>
              </Col>
              <Col>
                <div>
                  <Button onClick={onSubmit}>
                    Buscar
                  </Button>
                  <Button onClick={cleanSubmit}>
                    Limpiar
                  </Button>
                </div>
              </Col>
            </div>
          </Row>
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

                  <TableCell align="center">{reverseDate(appointment.appointment_date)}</TableCell>

                  <TableCell align="center">{appointment.appointment_time}</TableCell>

                  <TableCell align="center">{appointment.appointment_address}</TableCell>

                </TableRow>)
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      :
      <Container fluid className="withoutAppointments d-flex justify-content-center my-5">
        <h3>Actualmente no tienes histórico de citas</h3>
        <Button className="defineButton" onClick={cleanSubmit}>
            Volver
          </Button>
      </Container>}
    </div>
  );
};
