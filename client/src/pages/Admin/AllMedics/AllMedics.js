import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead,TableRow } from "@mui/material";
import axios from "axios";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import "./styleAllMedics.scss";
import { useNavigate } from "react-router";

export const AllMedics = () => {
  const { resetPage, setResetPage } = useContext(NetClinicsContext);
  const [medics, setMedics] = useState([]);
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    axios.get("http://localhost:4000/admin/getAllMedics").then((res) => {
      setMedics(res.data);
      console.log("información de todos los médicos", res.data);
    });
  }, [resetPage]);

  const deleted = (id, is_deleted) => {
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

  const vacation = (id, on_vacation) => {
    let url = `http://localhost:4000/admin/onVacation/${id}`;
    if (on_vacation === 1) {
      url = `http://localhost:4000/admin/offVacation/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setResetPage(!resetPage);
      })
      .catch((Err) => console.log(Err));
  };

  const enable = (id, is_enable) => {
    let url = `http://localhost:4000/admin/enableMedic/${id}`;
    if (is_enable === 1) {
      url = `http://localhost:4000/admin/disableMedic/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setResetPage(!resetPage);
      })
      .catch((Err) => console.log(Err));
  };

  return (
    <div className="bgAllMedics p-2">
      <Container fluid className="whiteBoxAllMedics d-flex justify-content-center my-5">
        {medics && (
          <TableContainer component={Paper}  className="tableAllMedics">
            <Table sx={{ minWidth: 390 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Profesional</TableCell>
                  <TableCell align="center">Nº Colegiado</TableCell>
                  <TableCell align="center">Teléfono</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Vacaciones</TableCell>
                  <TableCell align="center" size="small">
                    Habilitado
                  </TableCell>
                  <TableCell align="center">Borrar Usuario</TableCell>
                </TableRow>
              </TableHead>

              {/* Datos Tabla Médico */}
              <TableBody>
                {medics?.map((medic) => (
                  <TableRow
                    key={medic?.user_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                    >
                      {medic?.lastname}, {medic?.name}
                    </TableCell>

                    <TableCell align="center">
                      {medic?.medic_membership_number}
                    </TableCell>

                    <TableCell align="center">{medic?.phone_number}</TableCell>

                    <TableCell align="center">{medic?.email}</TableCell>

                    <TableCell align="center" size="small">
                      {medic.medic_is_on_vacation ? "De vacaciones" : "Activo"}
                    </TableCell>

                    <TableCell align="center" size="small">
                      <div className="d-flex justify-content-center">
                        {!medic?.medic_enabled ?
                          <button onClick={() => enable(medic.user_id, medic.medic_enabled)} className="buttonEnabledUser">
                              <div className="pointEnable"></div>
                              Habilitar
                          </button>
                          :
                          <button  onClick={() => enable(medic.user_id, medic.medic_enabled)} className="buttonDisabledUser">
                            <div className="pointDisabled"></div>
                            Deshabilitar
                          </button>
                        }
                      </div>
                  </TableCell>

                  <TableCell align="center" size="small">
                    <div className="d-flex justify-content-center">
                        {!medic.is_deleted ?
                        <button onClick={() => deleted(medic.user_id, medic.is_deleted)}  className="buttonDeleteOnUser">
                          <div className="pointDeleteOn"></div>
                          Eliminar
                        </button>
                        :
                        <button onClick={() => deleted(medic.user_id, medic.is_deleted)} className="buttonDeleteOffUser">
                          <div className="pointDeleteOff"></div>
                          Activar
                        </button>
                        }
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
