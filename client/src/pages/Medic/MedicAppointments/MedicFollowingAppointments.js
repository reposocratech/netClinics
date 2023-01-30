import React, { useContext, useEffect, useState } from "react";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { useNavigate } from "react-router";
import Avatar from '@mui/material/Avatar';
import axios from "axios";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { reverseDate } from "../../../Utils/reverseDatePicker/reverseDatePicker";
import { Col, Container, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { MedicAppointmentView } from "./MedicAppointmentView";
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

import "./myDatesMedic.scss";

export const MedicFollowingAppointments = () => {

  const [appointmentData, setAppointmentData] = useState([]);
  const { user, resetPage, setResetPage } = useContext(NetClinicsContext);
  const [handleShow, setHandleShow] = useState({
    open: false,
    appointment: null,
  });


  useEffect(() => {
    if (!user.user_id) return;
    axios
      .get(
        `http://localhost:4000/medic/getConfirmedAppointments/${user.user_id}`
      )
      .then((res) => {
        setAppointmentData(res.data);
      })
      .catch((err) => console.log(err));
  }, [resetPage]);

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

  const openModal = (appointment) => {
    setHandleShow({ open: true, appointment: appointment });
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

          {/* Tabla Próximas Citas */}
          <TableContainer component={Paper} className="tableMyDates mt-4">
            <Table sx={{ minWidth: 390 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Paciente</TableCell>
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">Hora</TableCell>
                  <TableCell align="center">Dirección</TableCell>
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
                        className="viewProf"
                        align="center"
                        onClick={() => openModal(appointment)}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={`assets/images/user/${appointment.avatar}`} 
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>

                      <TableCell 
                      align="center" 
                      className="viewProf"
                      onClick={() => openModal(appointment)}>
                        <strong>{appointment.lastname}</strong>,{" "}
                        {appointment.name}
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
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      :
        <Container className="withoutAppointments d-flex flex-column justify-content-center align-items-center my-5">
          <h3>Actualmente no tienes histórico de citas</h3>
          <button className="deffineButton" onClick={cleanSubmit}>
            Volver
          </button>
        </Container>
      }
      {handleShow.open && 
        <MedicAppointmentView 
          handleShow={handleShow}
          setHandleShow={setHandleShow} 
        />
      }
    </div>
  );
};
