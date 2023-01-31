import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { NetClinicsContext } from '../../../context/NetClinicsProvider';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import './styleAdminUtils.scss'

export const AdminUtils = () => {
  const [specialityName, setSpecialityName] = useState("")
  const [listSpeciality, setListSpeciality] = useState([]);
  const { resetPage, setResetPage } = useContext(NetClinicsContext);

  useEffect(() => {
    //Hago busqueda de todas las especialidades
    axios
    .get("http://localhost:4000/admin/getAllSpeciality")
    .then((res)=>{
      setListSpeciality(res.data);
    })
    .catch((error) =>{
      console.log(error);
    })
  }, [resetPage]);

  //Función para agregar la nueva especialidad
  const onSubmit = () =>{
    axios
    .post("http://localhost:4000/admin/createSpeciality", {specialityName:specialityName})
    .then((res)=>{
      setResetPage(!resetPage)
      setSpecialityName("")

    })
    .catch((error) =>{
      console.log(error);
    })
  };

  const handleChange = (e) =>{
    setSpecialityName(e.target.value);
  };
  
  return (
    <div className="bgAdminUtils p-2">
      <Container className="whiteBoxAdminUtils d-flex flex-column justify-content-center align-items-center mt-5">
        {/* Campo para añadir una nueva especialidad */}
        <Row className="contAdminUtils d-flex justify-content-center p-3">
          <div className="adminUtils align-items-center justify-content-center d-flex gap-2">
            <Col xs={8} sm={8} md={10} lg={10}>
              <InputGroup>
                <InputGroup.Text><i className="fa-solid fa-user-doctor"></i></InputGroup.Text>
                  <Form.Control
                    placeholder='Introduzca nueva especialidad'
                    name='speciality_name'
                    type='text'
                    autoComplete='off'
                    aria-label='Nombre especialidad'
                    aria-describedby="basic-addon1"
                    value={specialityName}
                    onChange={handleChange}
                    required
                  />
              </InputGroup>
            </Col>

            <Col xs={2} sm={2} md={2} lg={2}>
              <div className=''>
                <button className='defineButton' onClick={onSubmit}>Guardar</button>
              </div>
            </Col>
          </div>
        </Row>

        {/* Muestro todas las especialides actuales */}
        {listSpeciality && (
          <TableContainer component={Paper} className="mt-4">
          <h3 className="title text-center my-3">Especialidades</h3>
          <Table sx={{ minWidth: 390 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>Nombre especialidad</strong></TableCell>
              </TableRow>
            </TableHead>

            {/* Datos Tabla Especialidades */}
            <TableBody className='text-center'>
                {listSpeciality?.map((speciality) => (
                <TableRow key={speciality.speciality_id}>
                  <TableCell align="center">{speciality.speciality_name}</TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
      </Container>
    </div>
  )
}


