import React from "react";
import { Col, Button } from 
"react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export const FormEditUser = ({
  editUser,
  handleChange,
  handleFile,
  onSubmit,
  navigate,
  listProvinces,
  listCities,
  getCity,
}) => {


  return (
      <>
        <Col  xs={12} sm={12} md={12} lg={12}className='d-flex justify-content-end me-3'>
            <Form>
                <Form.Check 
                    defaultChecked
                    onClick={()=> navigate('/myProfile')}
                    type="switch"
                    id="custom-switch"
                    label="Ver Perfil"
                />
            </Form>
        </Col>

        {/* Foto Perfil */}
        <Col xs={12} sm={12} md={12} lg={12} className="d-flex justify-content-center text-center">
          <div className="imagePatientProfile">
            <img
                  className="imagePatient"
                  src={`assets/images/user/${editUser?.avatar}`}
                />
            <h2 className="my-3">{editUser?.name} {editUser?.lastname}</h2>
          </div>
        </Col>

        {/* Datos Paciente */}
        {/* Sobre mí */}
        <Col xs={12} sm={12} md={12} lg={6} className="d-flex justify-content-center align-items-center">
          <form encType="multipart/form" className="d-flex flex-column">
            <div className="contEditPatient d-flex flex-row align-items-center">
              <label className="me-2">Nombre:</label>
              <InputGroup className='inputPatient mb-3'>
                <Form.Control
                  placeholder="Name"
                  name="name"
                  value={editUser?.name}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>

            <div className="contEditPatient d-flex flex-row align-items-center">
              <label className="me-2">Apellidos:</label>
              <InputGroup className='inputPatient mb-3'>
                <Form.Control
                  placeholder="Apellidos"
                  name="lastname"
                  value={editUser?.lastname}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>

            <div className="contEditPatient d-flex flex-row align-items-center">
              <label className="me-2">Email:</label>
              <InputGroup className='inputPatient mb-3'>
                <Form.Control
                  placeholder="Email"
                  name="email"
                  value={editUser?.email}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>

            <div className="contEditPatient d-flex flex-row align-items-center">
              <label className="me-2">Teléfono:</label>
              <InputGroup className='inputPatient mb-3'>
                <Form.Control
                  placeholder="telefono"
                  name="phone_number"
                  value={editUser?.phone_number}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>
          </form>
        </Col>

        <Col  xs={12} sm={12} md={12} lg={6} className="d-flex justify-content-center align-items-center">
          <form encType="multipart/form" className="d-flex flex-column">
            <div className="contEditPatient d-flex flex-row align-items-center">
              <label className="me-2">Dirección:</label>
              <InputGroup className='inputPatient mb-3'>
                <Form.Control
                  placeholder="direccion"
                  name="address"
                  value={editUser?.address}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>

            <div className="contEditPatient d-flex flex-row align-items-end mb-3">
              <label className="me-2">Provincia:</label>
                <select
                  className='selectPatient'
                  name="province_id"
                  value={editUser?.province_id}
                  onChange={(e) => getCity(e.target.value)}>

                  {listProvinces?.map((province) => {
                    return (
                      <option
                        key={province?.province_id}
                        value={province?.province_id}
                        
                      >
                        {province?.province_name}
                      </option>

                    );
                  })}
                </select>
            </div>

            <div className="contEditPatient d-flex flex-row align-items-end mb-3">
              <label className="me-2">Ciudad:</label>
              <select 
                className='selectPatient'
                value={editUser?.city_id}
                name="city_id"
                onChange={handleChange}>

                {listCities?.map((city) => {
                  return (
                    <option 
                      key={city?.city_id} 
                      value={city?.city_id}>
                      {city?.city_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="contEditPatient d-flex flex-row align-items-center">
              <label className="me-2">Codigo postal:</label>
              <InputGroup className='inputPatient mb-3'>
                <Form.Control
                  placeholder="telefono"
                  name="postal_code"
                  value={editUser?.postal_code}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>
          </form>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} className="d-flex justify-content-center align-items-center mb-2">
          <form encType="multipart/form">
            <div className="contEditPatient d-flex flex-row align-items-center">
              <label className="me-2">Cambiar imagen:</label>

              <InputGroup className='mb-3'>
                <input
                  type="file"
                  className="fylePatientProfile m-2"
                  autoComplete="off"
                  onChange={handleFile}
                />
              </InputGroup>
            </div>
          </form>
        </Col>

        <div className="contEditPatient d-flex flex-row justify-content-center mb-2">
          <Button className="defineButton m-2" onClick={onSubmit}>
            Guardar cambios
          </Button>
        </div>
      </>
  );
};
