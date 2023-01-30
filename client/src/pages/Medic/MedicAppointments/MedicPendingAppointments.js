import React, { useContext, useEffect, useState } from "react";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { reverseDate } from "../../../Utils/reverseDatePicker/reverseDatePicker";
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
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import "./myDatesMedic.scss";

export const MedicPendingAppointments = () => {
  const [appointmentData, setAppointmentData] = useState();
  const [listPatients, setListPatients] = useState([]);
  const { user, resetPage, setResetPage } = useContext(NetClinicsContext);

  useEffect(() => {
    if (!user.user_id) return;
    axios
      .get(`http://localhost:4000/medic/getPendingAppointments/${user.user_id}`)
      .then((res) => {
        setAppointmentData(res.data);
      })
      .catch((err) => console.log(err));
  }, [resetPage]);

  const cancelAppointment = (id_appointment) => {
    axios
      .delete(
        `http://localhost:4000/medic/cancelPendingAppointment/${id_appointment}`
      )
      .then((res) => {
        setResetPage(!resetPage);
      })
      .catch((err) => console.log(err));
  };

  const acceptAppointment = (id_appointment) => {
    axios
      .put(
        `http://localhost:4000/medic/acceptPendingAppointment/${id_appointment}`
      )
      .then((res) => {
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
      {appointmentData?.length !== 0 ? (
        <Container className="whiteBoxPendingAppointment d-flex flex-column justify-content-center align-items-center my-5">
          {/* Buscador por filtro */}
          <Row className="contSearcher d-flex justify-content-center p-3">
            <div className="searcher align-items-center justify-content-center d-flex gap-2">
              <Col xs={12} sm={12} md={8} lg={8}>
                <InputGroup className="textSearcher">
                  <InputGroup.Text id="basic-addon1">
                    <CalendarMonthRoundedIcon></CalendarMonthRoundedIcon>
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
            <Table sx={{ minWidth: 390 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Paciente</TableCell>
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
                      <TableCell align="center">
                      <img
                        src={`assets/images/user/${appointment.avatar}`}
                      />
                      </TableCell>

                      <TableCell align="center">
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
                              acceptAppointment(appointment?.appointment_id)
                            }
                          >
                            <DoneRoundedIcon />
                            Aceptar
                          </button>

                          <button
                            className="declinetButton"
                            onClick={() =>
                              cancelAppointment(appointment?.appointment_id)
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
        <Container className="withoutAppointments d-flex justify-content-center my-5">
          <h3>Actualmente no tienes histórico de citas</h3>
          <button className="deffineButton" onClick={cleanSubmit}>
            Volver
          </button>
        </Container>
      )}
    </div>
  );
};
