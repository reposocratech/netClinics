import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const AllMedicsAdmin = ({
  navigate,
  enable,
  deleted,
  searchComplete,
  results,
  handlerSearch,
  cleanSubmit,
  onSubmit,
}) => {
  return (
    <div className="p-2 mt-5">
      <Container className="whiteBoxAllMedics d-flex flex-column justify-content-center">
        {/* Buscador por filtro */}
        <Row className="contSearcher d-flex justify-content-center p-3">
          <div className="searcher align-items-center justify-content-center d-flex gap-2">
            <Col xs={12} sm={12} md={2} lg={2}>
              <InputGroup className="textSearcher">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-user-doctor"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Apellido"
                  name="searchlastName"
                  type="text"
                  autoComplete="off"
                  aria-label="text"
                  aria-describedby="basic-addon1"
                  value={searchComplete.searchlastName}
                  onChange={handlerSearch}
                />
              </InputGroup>
            </Col>

            <Col xs={12} sm={12} md={2} lg={2}>
              <InputGroup className="textSearcher">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-user-doctor"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Nombre"
                  name="searchName"
                  type="text"
                  autoComplete="off"
                  aria-label="text"
                  aria-describedby="basic-addon1"
                  value={searchComplete.searchName}
                  onChange={handlerSearch}
                />
              </InputGroup>
            </Col>

            <Col xs={12} sm={12} md={2} lg={2}>
              <InputGroup className="textSearcher">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-city"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Provincia"
                  name="searchProvince"
                  type="text"
                  autoComplete="off"
                  aria-label="text"
                  aria-describedby="basic-addon1"
                  value={searchComplete.searchProvince}
                  onChange={handlerSearch}
                />
              </InputGroup>
            </Col>

            <Col xs={12} sm={12} md={2} lg={2}>
              <InputGroup className="textSearcher">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-location-pin"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Ciudad"
                  name="searchCity"
                  type="text"
                  autoComplete="off"
                  aria-label="text"
                  aria-describedby="basic-addon1"
                  value={searchComplete.searchCity}
                  onChange={handlerSearch}
                />
              </InputGroup>
            </Col>

            <Col xs={12} sm={12} md={2} lg={2} className="text-center">
              <div className="contButton d-flex gap-3">
                <Button className="defineButton" onClick={onSubmit}>
                  Buscar
                </Button>

                <Button className="defineButton" onClick={cleanSubmit}>
                  Limpiar
                </Button>
              </div>
            </Col>
          </div>
        </Row>

        {/* Tabla Profesionales Registrados */}
        {results && (
          <TableContainer component={Paper} className="tableAllMedics mt-4">
            <h3 className="title text-center my-3">Profesionales</h3>
            <Table sx={{ minWidth: 390 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Profesional</TableCell>
                  <TableCell align="center">Apellidos</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Provincia</TableCell>
                  <TableCell align="center">Ciudad</TableCell>
                  <TableCell align="center">Vacaciones</TableCell>
                  <TableCell align="center" size="small">
                    Habilitado
                  </TableCell>
                  <TableCell align="center">Borrar Usuario</TableCell>
                </TableRow>
              </TableHead>

              {/* Datos Tabla Médico */}
              <TableBody>
                {results?.map((medic) => (
                  <TableRow
                    key={medic?.user_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    size="small"
                  >
                    <TableCell
                      className="viewProf"
                      align="center"
                      onClick={() => navigate(`/medicProfile/${medic.user_id}`)}
                    >
                      <img
                        className="imageMedic"
                        src={`assets/images/user/${medic.avatar}`}
                      />
                    </TableCell>

                    <TableCell
                      className="viewProf"
                      align="center"
                      onClick={() => navigate(`/medicProfile/${medic.user_id}`)}
                      size="small"
                    >
                      <strong>{medic?.lastname}</strong>
                    </TableCell>
                    <TableCell
                      className="viewProf"
                      align="center"
                      onClick={() => navigate(`/medicProfile/${medic.user_id}`)}
                    >
                      {medic?.name}
                    </TableCell>

                    <TableCell align="center">{medic?.province_name}</TableCell>

                    <TableCell align="center">{medic?.city_name}</TableCell>

                    <TableCell align="center" size="small">
                      {medic.medic_is_on_vacation ? "De vacaciones" : "Activo"}
                    </TableCell>

                    <TableCell align="center" size="small">
                      {/* Botón para habilitar o deshabilitar, según el 
                      estado, el médico */}
                      <div className="d-flex justify-content-center">
                        {!medic?.medic_enabled ? (
                          <button
                            onClick={() =>
                              enable(medic.user_id, medic.medic_enabled)
                            }
                            className="buttonEnabledUser"
                          >
                            <div className="pointEnable"></div>
                            Habilitar
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              enable(medic.user_id, medic.medic_enabled)
                            }
                            className="buttonDisabledUser"
                          >
                            <div className="pointDisabled"></div>
                            Deshabilitar
                          </button>
                        )}
                      </div>
                    </TableCell>
                    {/*Botón para borrado lógico o activar, según estado, 
                    el médico */}
                    <TableCell align="center" size="small">
                      <div className="d-flex justify-content-center">
                        {!medic.is_deleted ? (
                          <button
                            onClick={() =>
                              deleted(medic.user_id, medic.is_deleted)
                            }
                            className="buttonDeleteOnUser"
                          >
                            <div className="pointDeleteOn"></div>
                            Eliminar
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              deleted(medic.user_id, medic.is_deleted)
                            }
                            className="buttonDeleteOffUser"
                          >
                            <div className="pointDeleteOff"></div>
                            Activar
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
};
