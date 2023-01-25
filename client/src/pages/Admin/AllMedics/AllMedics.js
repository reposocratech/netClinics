import React, { useContext, useEffect, useState } from "react";
import { Container } from 'react-bootstrap'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import "./styleAllMedics.scss";
import { useNavigate } from "react-router";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';


export const AllMedics = () => {
  const { resetPage, setResetPage } = useContext(NetClinicsContext);
  const [medics, setMedics] = useState([]);
  const navigate = useNavigate();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


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
      <Container fluid className="whiteBoxAllMedics my-5">
      {medics && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center">Profesional</TableCell>
                <TableCell align="center">D.N.I.</TableCell>
                <TableCell align="center">Nº Colegiado</TableCell>
                <TableCell align="center">Provincia</TableCell>
                <TableCell align="center">Ciudad</TableCell>
                <TableCell align="center">C.P.</TableCell>
                <TableCell align="center">Teléfono</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center" size="small">Habilitado</TableCell>
                <TableCell align="center">Disponible</TableCell>
                <TableCell align="center">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medics?.map((medic) => (
                <TableRow
                  key={medic?.user_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <img
                      className="imageMedic"
                      src={`assets/images/user/${medic.avatar}`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {medic?.lastname}, {medic?.name}
                  </TableCell>
                  <TableCell align="center">{medic?.dni}</TableCell>
                  <TableCell align="center">
                    {medic?.medic_membership_number}
                  </TableCell>
                  <TableCell align="center">{medic?.province_name}</TableCell>
                  <TableCell align="center">{medic?.city_name}</TableCell>
                  <TableCell align="center">{medic?.postal_code}</TableCell>
                  <TableCell align="center">{medic?.phone_number}</TableCell>
                  <TableCell align="center">{medic?.email}</TableCell>
                  <TableCell align="center" size="small">
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => enable(medic.user_id, medic.medic_enabled)}
                    >
                      {medic?.medic_enabled === 0
                        ? "No habilitado"
                        : "Habilitado"}
                    </Button>
                  </TableCell>
                  <TableCell align="center" size="small">
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() =>
                        vacation(medic.user_id, medic.medic_is_on_vacation)
                      }
                    >
                      {medic.medic_is_on_vacation === 0
                        ? "Disponible"
                        : "No disponible"}
                    </Button>
                  </TableCell>
                  <TableCell align="center" size="small">
                  <IconButton aria-label="delete"
                    onClick={() => deleted(medic.user_id, medic.is_deleted)}>
                    <Checkbox
                      {...label}
                      icon={<DeleteIcon />}
                      checkedIcon={<DeleteIcon />}
                    />
                  </IconButton>                    
                    {/* <Button
                      size="small"
                      variant="contained"
                      color="success"

                      onClick={() => deleted(medic.user_id, medic.is_deleted)}
                    >
                      {medic?.is_deleted === 0 ? "Activo" : "Inactivo"}
                    </Button> */}
                  </TableCell>

                  <TableCell align="center" size="small">
                    <Button
                    onClick={()=>navigate(`/medicProfile/${medic.user_id}`)} 
                      variant="contained"
                      size="small"
                      color="info"
                    >Ver perfil</Button>

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
