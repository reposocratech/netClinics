import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "./FormRegisterPatient.scss";

export const FormRegisterPatient = ({
  registerPatient,
  handleChange,
  getCity,
  handleCities,
  listCities,
  listProvinces,
  onSubmit,
  navigate,
  message1,
  message2,
  errorEmail,
}) => {
  return (
    <div className='bgColorFormRegister pb-5'>
    <Container>
      <Row>
        <Col className='d-flex align-items-center justify-content-end my-3'>
          <button className='borderButton' onClick={() => navigate('/registerMedic')}>
          ¿Eres Fisio?
          Regístrate aquí
          </button>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex align-items-center justify-content-center'>
          <div className='whiteBoxFormRegister'>

            {/* Logo Netclinics */}
            <div className='titleFormRegisterPatient text-center mb-4'>
              <img alt="logo-netclinics" className='logoRegisterForm' src='/assets/images/logo/Logo-NetClinics2-02.png'/>
            </div>

            {/* Container Formulario */}
            <div className='d-flex flex-column'>

              <InputGroup className='mb-3'>
               <InputGroup.Text id="basic-addon1" className='inputRegister'><i className="fa-solid fa-user"></i></InputGroup.Text>
                <Form.Control
                placeholder='Escribe tu Nombre'
                name='name'
                type='text'
                autoComplete='off'
                aria-label='Nombre'
                aria-describedby="basic-addon1"
                value={registerPatient.name}
                onChange={handleChange}
                required
                />
              </InputGroup>
            </div>
              
              {/* Container Formulario */}
              <div className="d-flex flex-column">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1" className="inputRegister">
                    <i className="fa-solid fa-user"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Escribe tu Nombre"
                    name="name"
                    type="text"
                    autoComplete="off"
                    aria-label="Nombre"
                    aria-describedby="basic-addon1"
                    value={registerPatient.name}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1" className="inputRegister">
                    <i className="fa-solid fa-user"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Escribe tu Apellido"
                    name="lastname"
                    type="text"
                    autoComplete="off"
                    aria-label="Apellido"
                    aria-describedby="basic-addon1"
                    value={registerPatient.lastname}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1" className="inputRegister">
                    <i className="fa-solid fa-address-card"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Introduce tu D.N.I"
                    name="dni"
                    type="text"
                    autoComplete="off"
                    aria-label="D.N.I"
                    aria-describedby="basic-addon1"
                    value={registerPatient.dni}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1" className="inputRegister">
                    <i className="fa-solid fa-phone"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Introduce tu Nº de Teléfono"
                    name="phone_number"
                    type="text"
                    autoComplete="off"
                    aria-label="Nº de Teléfono"
                    aria-describedby="basic-addon1"
                    value={registerPatient.phone_number}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1" className="inputRegister">
                    <i className="fa-solid fa-map-location"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Escribe tu Dirección"
                    name="address"
                    type="text"
                    autoComplete="off"
                    aria-label="Dirección"
                    aria-describedby="basic-addon1"
                    value={registerPatient.address}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1" className="inputRegister">
                    <i className="fa-solid fa-location-pin"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Introduce tu Código Postal"
                    name="postal_code"
                    type="text"
                    autoComplete="off"
                    aria-label="Código Postal"
                    aria-describedby="basic-addon1"
                    value={registerPatient.postal_code}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <div className="d-flex w-100">
                    <InputGroup.Text
                      id="basic-addon1"
                      className="inputRegister iconSelect"
                    >
                      <i className="fa-solid fa-city"></i>
                    </InputGroup.Text>
                    <Form.Select
                      className="selectPatient"
                      name="province"
                      onChange={(e) => getCity(e.target.value)}
                    >
                      <option>Elige Provincia</option>
                      {listProvinces?.map((province) => {
                        return (
                          <option
                            key={province.province_id}
                            value={province.province_id}
                          >
                            {province.province_name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </div>
                </InputGroup>

                <InputGroup className="mb-3">
                  <div className="d-flex w-100">
                    <InputGroup.Text
                      id="basic-addon1"
                      className="inputRegister iconSelect"
                    >
                      <i className="fa-solid fa-city"></i>
                    </InputGroup.Text>
                    <Form.Select
                      className="selectPatient"
                      name="cities"
                      onChange={handleCities}
                    >
                      <option>Elige Ciudad</option>
                      {listCities?.map((city) => {
                        return (
                          <option key={city.city_id} value={city.city_id}>
                            {city.city_name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </div>
                </InputGroup>

                <InputGroup className={`mb-3 ${errorEmail && errorEmail}`}>
                  <InputGroup.Text id="basic-addon1" className="inputRegister">
                    <i className="fa-solid fa-envelope"></i>
                  </InputGroup.Text>

                  <Form.Control
                    placeholder="Escribe tu Email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    aria-label="Email"
                    value={registerPatient.email}
                    onChange={handleChange}
                    aria-describedby="basic-addon1"
                    required
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1" className="inputRegister">
                    <i class="fa-solid fa-lock"></i>
                  </InputGroup.Text>

                  <Form.Control
                    placeholder="Introduce tu Contraseña"
                    name="password"
                    type="password"
                    autoComplete="off"
                    aria-label="Contraseña"
                    value={registerPatient.password}
                    onChange={handleChange}
                    aria-describedby="basic-addon1"
                    required
                  />
                </InputGroup>

                <div className="mb-2">
                  {message1 && (
                    <p className="text-center text-danger">
                      Introduce correctamente todos los datos
                    </p>
                  )}
                  {message2 && (
                    <p className="text-center text-danger">
                      Ya existe una cuenta con este email
                    </p>
                  )}
                </div>
              </div>

              <div className="d-flex flex-column align-items-center justify-content-center text-center">
                <button className="defineButton" onClick={onSubmit}>
                  Regístrate
                </button>

                <hr className="lineFormRegister" />

                <p>¿Ya tienes cuenta?</p>

                <button
                  className="mb-3 defineButton"
                  onClick={() => navigate("/")}
                >
                  Login
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
