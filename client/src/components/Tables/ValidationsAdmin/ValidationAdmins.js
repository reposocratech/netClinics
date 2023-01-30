import React from 'react'
import { Container } from 'react-bootstrap'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const ValidationAdmins = ({medics, navigate, enable}) => {
  return (
    <div className="bgValidation p-2">
      <Container fluid className="whiteBoxValidation d-flex justify-content-center my-5">
        {medics && (
          <TableContainer component={Paper} className="tableValidation">
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Profesional a validar</TableCell>
                  <TableCell align="center">Nº Colegiado</TableCell>
                  <TableCell align="center">Provincia</TableCell>
                  <TableCell align="center">Ciudad</TableCell>
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
                        alt={medic.name}
                        className="imageMedic"
                        src={`assets/images/user/${medic.avatar}`}
                      />
                    </TableCell>

                    <TableCell className="viewProf" align="center"
                    onClick={()=>navigate(`/medicProfile/${medic.user_id}`)}>
                      <strong>{medic?.lastname},</strong> {medic?.name}
                    </TableCell>

                    <TableCell align="center">
                      {medic?.medic_membership_number}
                    </TableCell>

                    <TableCell align="center">{medic?.province_name}</TableCell>

                    <TableCell align="center">{medic?.city_name}</TableCell>

                    <TableCell align="center">
                    {!medic?.medic_enabled ?
                      <button onClick={() => enable(medic.user_id, medic.medic_enabled, medic)} className="buttonEnabledUser">
                          <div className="pointEnable"></div>
                          Habilitar
                      </button>
                      :
                      <button  onClick={() => enable(medic.user_id, medic.medic_enabled, medic)} className="buttonDisabledUser">
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


