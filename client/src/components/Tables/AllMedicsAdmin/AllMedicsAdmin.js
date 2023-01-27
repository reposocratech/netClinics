import React, { useState } from 'react'
import { Button, Col, Container, Row } from "react-bootstrap";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead,TableRow } from "@mui/material";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const AllMedicsAdmin = ({
  navigate, 
  enable, 
  deleted, 
  searchComplete, 
  results,  
  handlerSearch, 
  cleanSubmit,
  onSubmit}) => {

   
  return (
    <>
    <Row className='py-4'>
    <Col>
        <InputGroup className='mb-3'>
                    <InputGroup.Text id="basic-addon1">Apellidos</InputGroup.Text>
                    <Form.Control
                    placeholder='Apellidos Profesional'
                    name='searchlastName'
                    type='text'
                    autoComplete='off'
                    aria-label='text'
                    aria-describedby="basic-addon1"
                    value={searchComplete.searchlastName}
                    onChange={handlerSearch}
                    />
        </InputGroup>
      </Col>
      <Col>
        <InputGroup className='mb-3'>
                    <InputGroup.Text id="basic-addon1">Nombre</InputGroup.Text>
                    <Form.Control
                    placeholder='Nombre Profesional'
                    name='searchName'
                    type='text'
                    autoComplete='off'
                    aria-label='text'
                    aria-describedby="basic-addon1"
                    value={searchComplete.searchName}
                    onChange={handlerSearch}
                    />
        </InputGroup>
      </Col>
      <Col>
        <InputGroup className='mb-3'>
                    <InputGroup.Text id="basic-addon1">Provincia</InputGroup.Text>
                    <Form.Control
                    placeholder='Provincia'
                    name='searchProvince'
                    type='text'
                    autoComplete='off'
                    aria-label='text'
                    aria-describedby="basic-addon1"
                    value={searchComplete.searchProvince}
                    onChange={handlerSearch}
                    />
        </InputGroup>
      </Col>
      <Col>
        <InputGroup className='mb-3'>
                    <InputGroup.Text id="basic-addon1">Ciudad</InputGroup.Text>
                    <Form.Control
                    placeholder='Ciudad'
                    name='searchCity'
                    type='text'
                    autoComplete='off'
                    aria-label='text'
                    aria-describedby="basic-addon1"
                    value={searchComplete.searchCity}
                    onChange={handlerSearch}
                    />
        </InputGroup>
      </Col>
      <Row>
        <Col className='d-flex justify-content-center'>
        <Button className='m-2' onClick={onSubmit}>Buscar</Button>
        <Button className='m-2' onClick={cleanSubmit}>Limpiar</Button>
      </Col>
      </Row>
      
    </Row>
    <div className="p-2">
      <Container className="whiteBoxAllMedics d-flex justify-content-center my-5">
        {results && (
          <TableContainer component={Paper}  className="tableAllMedics">
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
                      {medic?.lastname}
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
    </>
  )
}


