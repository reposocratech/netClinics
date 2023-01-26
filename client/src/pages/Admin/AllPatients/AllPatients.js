import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead,TableRow } from "@mui/material";
import axios from "axios";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { useNavigate } from "react-router";
import "./styleAllPatiens.scss";

export const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const { resetPage, setResetPage } = useContext(NetClinicsContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/admin/getAllPatients").then((res) => {
      setPatients(res.data);
    });
  }, [resetPage]);

  const handleEdit = (id, is_deleted) => {
    let url = `http://localhost:4000/user/deleteUser/${id}`;

    if (is_deleted === 1) {
      url = `http://localhost:4000/admin/enableUser/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setResetPage(!resetPage);
      })
      .catch((Err) => console.log(Err));
  };

  return (
    <div className="bgAllPatients p-2">
      <Container fluid className="whiteBoxAllPatients d-flex justify-content-center my-5">
        {patients && (
          <TableContainer component={Paper} className="tableAllPatient">
            <Table sx={{ minWidth: 390 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Paciente</TableCell>
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
                      {patient.name} {patient.lastname}
                    </TableCell>

                    <TableCell align="center">{patient.phone_number}</TableCell>

                    <TableCell align="center">{patient.email}</TableCell>

                    <TableCell align="center" size="small">
                      <div className="d-flex justify-content-center">
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
