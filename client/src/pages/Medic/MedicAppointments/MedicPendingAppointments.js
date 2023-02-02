import React, { useContext, useEffect, useState } from "react";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { reverseDate } from "../../../Utils/reverseDatePicker/reverseDatePicker";
import Avatar from '@mui/material/Avatar';
import axios from "axios";

import { Container, Row, Col } from "react-bootstrap";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

import "./myDatesMedic.scss";

import { MedicAppointmentView } from "./MedicAppointmentView";
import { useNavigate } from "react-router";

export const MedicPendingAppointments = () => {
  
  const [appointmentData, setAppointmentData] = useState();
  const { user, resetPage, setResetPage } = useContext(NetClinicsContext);

  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const [handleShow, setHandleShow] = useState({
    open: false,
    appointment: null,
  });

  useEffect(() => {
    if (!user.user_id) return;
    axios
      .get(`http://localhost:4000/medic/getPendingAppointments/${user.user_id}`)
      .then((res) => {
        setAppointmentData(res.data);
      })
      .catch((err) => console.log(err));
  }, [resetPage, user]);

  const cancelAppointment = (appointment) => {
    axios
      .delete(
        `http://localhost:4000/medic/cancelPendingAppointment/${appointment.appointment_id}`
      )
      .then((res) => {
        cancelAppointmentEmail(appointment)
        setResetPage(!resetPage);
      })
      .catch((err) => console.log(err));
  };

  const acceptAppointment = (appointment) => {
    axios
      .put(
        `http://localhost:4000/medic/acceptPendingAppointment/${appointment.appointment_id}`
      )
      .then((res) => {
        acceptAppointmentEmail(appointment);
        setResetPage(!resetPage);
      })
      .catch((err) => console.log(err));
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
    setIsSearch(true);
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

  const openModal = (appointment) => {
    setHandleShow({ open: true, appointment: appointment });
  };


  //Envío de email cuando se acepta la cita, lo recibe el cliente
  const acceptAppointmentEmail = (appointment) => {
    axios
    .post("http://localhost:4000/medic/acceptAppointment", {appointment, user});
  }

  //Envío de email cuando se cancela la cita, lo recibe el cliente
  const cancelAppointmentEmail = (appointment) => {
    axios
    .post("http://localhost:4000/medic/cancelAppointment", {appointment, user});
  }

  return (
    <div className="bgAppointmentHistory p-2">
      {appointmentData?.length !== 0 ? (
        <Container className="whiteBoxPendingAppointment d-flex flex-column justify-content-center align-items-center my-5">

          {/* Buscador por filtro */}
          <Row className="contSearcher d-flex justify-content-center p-3">
            <div className="searcher align-items-center justify-content-center d-flex gap-2">
              <Col xs={12} sm={12} md={8} lg={8}>
                <InputGroup className="textSearcher">
                  <InputGroup.Text id="basic-addon1">
                    <CalendarMonthTwoToneIcon/>
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

              <Col xs={12} sm={12} md={4} lg={4}>
                <div className="contButton d-flex gap-3">
                  <button className="deffineButton" onClick={onSubmit}>
                    Buscar
                  </button>
                  <button className="deffineButton" onClick={cleanSubmit}>
                    Limpiar
                  </button>
                </div>
              </Col>
            </div>
          </Row>

          {/* Tabla Citas Pendientes */}
          <TableContainer component={Paper} className="tableMyDates mt-4">
            <h3 className="title text-center my-3">Citas pendientes de Confirmación</h3>
            <Table sx={{ minWidth: 390 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Paciente</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">Hora</TableCell>
                  <TableCell align="center">Dirección</TableCell>
                  <TableCell align="center">Petición</TableCell>
                </TableRow>
              </TableHead>

              {/* Datos Tabla */}
              <TableBody>
                {appointmentData?.map((appointment, i) => {
                  return (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell 
                      align="center"
                      className="viewProf"
                      onClick={() => openModal(appointment)}>
                        <div className='d-flex align-items-center justify-content-center'>
                          <Avatar
                            alt="Remy Sharp"
                            src={`assets/images/user/${appointment.avatar}`}
                            sx={{ width: 56, height: 56 }}
                          />
                        </div>
                       
                      </TableCell>

                      <TableCell 
                      align="center"
                      className="viewProf"
                      onClick={() => openModal(appointment)}>
                        <strong>{appointment.lastname}</strong>,  {appointment.name}
                      </TableCell>

                      <TableCell align="center">
                        {reverseDate(appointment.appointment_date)}
                      </TableCell>

                      <TableCell align="center">
                        {appointment.appointment_time}
                      </TableCell>

                      <TableCell align="center">
                        {appointment.address}, {appointment.city_name} ({" "}
                        {appointment.province_name} ) -{" "}
                        {appointment.postal_code}
                      </TableCell>

                      <TableCell align="center">
                        <div className="contButton d-flex justify-content-center gap-3">
                          <button
                            className="acceptButton"
                            onClick={() =>
                              acceptAppointment(appointment)
                            }
                          >
                            <DoneRoundedIcon />
                            Aceptar
                          </button>

                          <button
                            className="declinetButton"
                            onClick={() =>
                              cancelAppointment(appointment)
                            }
                          >
                            <ClearRoundedIcon />
                            Cancelar
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      ) : (
        <Container className="withoutAppointments d-flex flex-column justify-content-center align-items-center my-5">
          <h3>Actualmente no tienes citas pendiente de confirmar</h3>
          {isSearch ?
          <button className="deffineButton" onClick={cleanSubmit}>
            Volver
          </button>
          :
          <button className="deffineButton" onClick={()=> navigate("/")}>
            Inicio
          </button>
          }
        </Container>
      )}
       {handleShow.open && 
        <MedicAppointmentView 
          handleShow={handleShow}
          setHandleShow={setHandleShow} 
        />
      }
    </div>
  );
};
