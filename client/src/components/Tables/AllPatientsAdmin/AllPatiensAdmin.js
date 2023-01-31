import React from "react";
import { Container } from "react-bootstrap";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const AllPatiensAdmin = ({ patients, navigate, handleEdit }) => {
  return (
    <div className="bgAllPatients p-2">
      <Container
        fluid
        className="whiteBoxAllPatients d-flex justify-content-center my-5"
      >
        {patients && (
          <TableContainer component={Paper} className="tableAllPatient">
            <h3 className="title text-center my-3">Pacientes</h3>
            <Table sx={{ minWidth: 390 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Paciente</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Teléfono</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Estado</TableCell>
                </TableRow>
              </TableHead>

              {/* Datos Tabla Paciente */}
              <TableBody>
                {patients?.map((patient) => (
                  <TableRow
                    key={patient.user_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      className="viewProf"
                      align="center"
                      onClick={() =>
                        navigate(`/patientProfile/${patient?.user_id}`)
                      }
                    >
                      <img
                        alt={patient?.name}
                        className="imagePatient"
                        src={`assets/images/user/${patient.avatar}`}
                      />
                    </TableCell>

                    <TableCell
                      className="viewProf"
                      align="center"
                      onClick={() =>
                        navigate(`/patientProfile/${patient.user_id}`)
                      }
                    >
                      <strong>{patient.lastname},</strong> {patient.name}
                    </TableCell>

                    <TableCell align="center">{patient.phone_number}</TableCell>

                    <TableCell align="center">{patient.email}</TableCell>

                    <TableCell align="center" size="small">
                      <div className="d-flex justify-content-center">
                        {/* Botón para borrado lógico del paciente */}
                        {patient?.is_deleted ? (
                          <button
                            onClick={() =>
                              handleEdit(patient.user_id, patient.is_deleted)
                            }
                            className="buttonEnabledUser"
                          >
                            <div className="pointEnable"></div>
                            Habilitar
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleEdit(patient.user_id, patient.is_deleted)
                            }
                            className="buttonDisabledUser"
                          >
                            <div className="pointDisabled"></div>
                            Deshabilitar
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
