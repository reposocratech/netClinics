import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import axios from "axios";

import "./styleAllPatiens.scss";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";

export const AllPatients = () => {

  const [patients, setPatients] = useState([]);

  const { resetPage, setResetPage } = useContext(NetClinicsContext);

  useEffect(() => {

    axios
    .get("http://localhost:4000/admin/getAllPatients")
    .then((res) => {
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
    <div>
      {patients && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center">Paciente</TableCell>
                <TableCell align="center">D.N.I.</TableCell>
                <TableCell align="center">Dirección</TableCell>
                <TableCell align="center">Provincia</TableCell>
                <TableCell align="center">Ciudad</TableCell>
                <TableCell align="center">C.P.</TableCell>
                <TableCell align="center">Teléfono</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients?.map((patient) => (
                <TableRow
                  key={patient.user_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <img
                      className="imagePatient"
                      src={`assets/images/user/${patient.avatar}`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {patient.name} {patient.lastname}
                  </TableCell>
                  <TableCell align="center">{patient.dni}</TableCell>
                  <TableCell align="center">{patient.address}</TableCell>
                  <TableCell align="center">{patient.province_name}</TableCell>
                  <TableCell align="center">{patient.city_name}</TableCell>
                  <TableCell align="center">{patient.postal_code}</TableCell>
                  <TableCell align="center">{patient.phone_number}</TableCell>
                  <TableCell align="center">{patient.email}</TableCell>
                  <TableCell align="center">
                    {patient.is_deleted === 0 ? "Activo" : "Inactivo"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleEdit(patient.user_id, patient.is_deleted)
                      }
                    >
                      {patient.is_deleted === 0 ? "Deshabilitar" : "Habilitar"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
