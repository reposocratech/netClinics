import React, { useContext, useEffect, useState } from "react";
import { Container } from 'react-bootstrap'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { useNavigate } from "react-router";

import "./styleValidations.scss";

export const Validations = () => {
  const { resetPage, setResetPage } = useContext(NetClinicsContext);
  const [medics, setMedics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllMedicsValidation")
      .then((res) => {
        setMedics(res.data);
        console.log("información de todos los médicos", res.data);
      });
  }, [resetPage]);

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
    <div className="bgValidation p-2">
      <Container fluid className="whiteBoxValidation my-5">
        {medics && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Médico</TableCell>
                  <TableCell align="center">D.N.I.</TableCell>
                  <TableCell align="center">Nº Colegiado</TableCell>
                  <TableCell align="center">Dirección</TableCell>
                  <TableCell align="center">Provincia</TableCell>
                  <TableCell align="center">Ciudad</TableCell>
                  <TableCell align="center">C.P.</TableCell>
                  <TableCell align="center">Teléfono</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Habilitado</TableCell>
                </TableRow>
              </TableHead>

              {/* Datos Tabla Médico */}
              <TableBody>
                {medics?.map((medic) => (
                  <TableRow
                    key={medic?.user_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="viewProf" align="center"
                    onClick={()=>navigate(`/medicProfile/${medic.user_id}`)}>
                      <img
                        className="imageMedic"
                        src={`assets/images/user/${medic.avatar}`}
                      />
                    </TableCell>

                    <TableCell className="viewProf" align="center"
                    onClick={()=>navigate(`/medicProfile/${medic.user_id}`)}>
                      {medic?.lastname}, {medic?.name}
                    </TableCell>

                    <TableCell align="center">{medic?.dni}</TableCell>

                    <TableCell align="center">
                      {medic?.medic_membership_number}
                    </TableCell>

                    <TableCell align="center">{medic?.address}</TableCell>

                    <TableCell align="center">{medic?.province_name}</TableCell>

                    <TableCell align="center">{medic?.city_name}</TableCell>

                    <TableCell align="center">{medic?.postal_code}</TableCell>

                    <TableCell align="center">{medic?.phone_number}</TableCell>

                    <TableCell align="center">{medic?.email}</TableCell>

                    <TableCell align="center">
                      {medic?.medic_enabled ?
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
