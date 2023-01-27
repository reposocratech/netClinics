import React, { useState } from 'react'
import { Button, Col, Container, Row } from "react-bootstrap";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead,TableRow } from "@mui/material";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const AllMedicsAdmin = ({medics, navigate, enable, deleted}) => {

  const [searchComplete, setSearchComplete] = useState({
    searchName: "",
    searchlastName: "",
    searchProvince: "",
    searchCity: "",
  });

  const [results, setResults] = useState(medics);

  const handlerSearch = (e) => {
    const {name, value} = e.target;
    setSearchComplete({...searchComplete, [name]:value});
  }


  const onSubmit = () => {
    if(searchComplete.searchName !== "" && searchComplete.searchProvince === ""){
      setResults(medics.filter((medic) => {
        return medic.name.toLowerCase().includes(searchComplete.searchName.toLowerCase());
      }));
    }
    else if(searchComplete.searchName !== "" && searchComplete.searchProvince !== "" && searchComplete.searchCity === ""){
      setResults(medics.filter((medic) => {
        return medic.name.toLowerCase().includes(searchComplete.searchName.toLowerCase()) && medic.province_name.toLowerCase().includes(searchComplete.searchProvince.toLowerCase());
      }));
    }
    else{
      setResults(medics);
    }

  }

  const cleanSubmit = () => {
    setSearchComplete({
      searchName: "",
      searchlastName: "",
      searchProvince: "",
      searchCity: "",
    });
    setResults(medics);

  }

  return (
    <div className="p-2 my-5">
      <Container className="whiteBoxAllMedics d-flex flex-column justify-content-center">

        {/* Buscador por filtro */}
        <Row className='contSearcher d-flex justify-content-center p-3'>
          <div className='searcher align-items-center justify-content-center d-flex gap-2'>
            <Col xs={12} sm={12} md={2} lg={2}>
              <InputGroup className='textSearcher'>
                          <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-user-doctor"></i></InputGroup.Text>
                          <Form.Control
                          placeholder='Nombre'
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

            <Col xs={12} sm={12} md={2} lg={2}>
              <InputGroup  className='textSearcher'>
                          <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-user-doctor"></i></InputGroup.Text>
                          <Form.Control
                          placeholder='Apellidos'
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

            <Col xs={12} sm={12} md={2} lg={2}>
              <InputGroup  className='textSearcher'>
                          <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-city"></i></InputGroup.Text>
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

            <Col xs={12} sm={12} md={2} lg={2}>
              <InputGroup  className='textSearcher'>
                          <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-location-pin"></i></InputGroup.Text>
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

            <Col xs={12} sm={12} md={2} lg={2} className='text-center'>
              <div className='contButton d-flex gap-3'>
                <Button className='defineButton' onClick={onSubmit}>Buscar</Button>

                <Button className='defineButton' onClick={cleanSubmit}>Limpiar</Button>
              </div>
            </Col>
          </div>
        </Row>

        {/* Tabla Profesionales Registrados */}
        {medics && (
          <TableContainer component={Paper}  className="tableAllMedics my-4">
            <Table sx={{ minWidth: 390 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Profesional</TableCell>
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
                      align="left"
                      onClick={() => navigate(`/medicProfile/${medic.user_id}`)}
                    >
                      <strong>{medic?.lastname},</strong> {medic?.name}
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
  );
};


