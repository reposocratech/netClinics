import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import './FormRegisterMedic.scss';

export const FormRegisterMedic = ({ registerMedic, message1, message2, listProvinces, listCities, navigate, handleChange, handleFiles, onSubmit, getCity, handleCities, listSpecialities}) => {
  return (
    <Container fluid className='bgColorFormRegister d-flex flex-column'>
      <Row>
        <Col className='d-flex align-items-center justify-content-end my-3'>
          <button className='borderButton' onClick={() => navigate('/registerPatient')}>
          ¿Eres Paciente? Regístrate aquí
          </button>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex align-items-center justify-content-center'>
          <div className='whiteBoxFormRegister d-flex flex-column mb-5'>

            {/* Logo Netclinics */}
            <div className='titleFormRegisterPatient text-center mb-4'>
              <img className='logoRegisterForm' src='/assets/images/logo/Logo-NetClinics2-02.png'/>
            </div>

            {/* Container Formulario */}
            <div className='d-flex flex-column'>
              <InputGroup className='mb-3'>

                <Form.Control
                placeholder='Escribe tu Nombre'
                name='name'
                type='text'
                autoComplete='off'
                aria-label='Nombre'
                aria-describedby="basic-addon1"
                value={registerMedic.name}
                onChange={handleChange}
                required
                />
              </InputGroup>

              <InputGroup className='mb-3'>

                <Form.Control
                placeholder='Escribe tu Apellido'
                name='lastname'
                type='text'
                autoComplete='off'
                aria-label='Apellido'
                aria-describedby="basic-addon1"
                value={registerMedic.lastname}
                onChange={handleChange}
                required
                />
              </InputGroup>

              <InputGroup className='mb-3'>

                <Form.Control
                placeholder='Introduce tu D.N.I'
                name='dni'
                type='text'
                autoComplete='off'
                aria-label='D.N.I'
                aria-describedby="basic-addon1"
                value={registerMedic.dni}
                onChange={handleChange}
                required
                />
              </InputGroup>

              <InputGroup className='mb-3'>

                <Form.Control
                placeholder='Introduce tu Nº de Teléfono'
                name='phone_number'
                type='text'
                autoComplete='off'
                aria-label='Nº de Teléfono'
                aria-describedby="basic-addon1"
                value={registerMedic.phone_number}
                onChange={handleChange}
                required
                />
              </InputGroup>

              <InputGroup className='mb-3'>

                <Form.Control
                placeholder='Escribe tu Dirección'
                name='address'
                type='text'
                autoComplete='off'
                aria-label='Dirección'
                aria-describedby="basic-addon1"
                value={registerMedic.address}
                onChange={handleChange}
                required
                />
              </InputGroup>

              <InputGroup className='mb-3'>

                <Form.Control
                placeholder='Introduce tu Código Postal'
                name='postal_code'
                type='text'
                autoComplete='off'
                aria-label='Código Postal'
                aria-describedby="basic-addon1"
                value={registerMedic.postal_code}
                onChange={handleChange}
                required
                />
              </InputGroup>

              <InputGroup className='mb-3'>

                <Form.Control
                placeholder='Introduce tu Nº de Colegiado'
                name='medic_membership_number'
                type='text'
                autoComplete='off'
                aria-label='Código Postal'
                aria-describedby="basic-addon1"
                value={registerMedic.medic_membership_number}
                onChange={handleChange}
                required
                />
              </InputGroup>

              <InputGroup className='mb-3'>
                <select className='selectMedic' name='province'
                onChange={(e) => getCity(e.target.value)}>
                <option>Elige Provincia</option>
                {listProvinces?.map((province) => {
                  return (
                      <option key={province.province_id} value={province.province_id}>{province.province_name}</option>    
                    )
                  })}
                </select>
              </InputGroup>

              <InputGroup className='mb-3'>
                <select className='selectMedic' name='cities'
                onChange={handleCities}>
                <option>Elige Ciudad</option>
                {listCities?.map((city) => {
                  return (
                      <option key={city.city_id} value={city.city_id}>{city.city_name}</option>    
                    )
                  })}
                </select>
              </InputGroup>

              <InputGroup className='mb-3'>
                <select className='selectMedic' name='speciality_id' onChange={handleChange}>
                <option>Elige Especialidad</option>
                {listSpecialities?.map((el) => {
                  return (
                      <option key={el.speciality_id} value={el.speciality_id}>{el.speciality_name}</option>    
                    )
                  })}
                </select>
              </InputGroup>


              <InputGroup className='mb-3'>
                <InputGroup.Text id="basic-addon1" className='inputRegister'><i className="fa-solid fa-envelope"></i></InputGroup.Text>

                <Form.Control
                placeholder="Escribe tu Email"
                name="email"
                type="email"
                autoComplete="off"
                aria-label="Email"
                value={registerMedic.email}
                onChange={handleChange}
                aria-describedby="basic-addon1"
                required
                />
              </InputGroup>

              <InputGroup className='mb-3'>
                
                <InputGroup.Text id="basic-addon1" className='inputRegister'><i className="fa-solid fa-lock"></i></InputGroup.Text>
                
                <Form.Control
                placeholder="Introduce tu Contraseña"
                name="password"
                type="password"
                autoComplete="off"
                aria-label="Contraseña"
                value={registerMedic.password}
                onChange={handleChange}
                aria-describedby="basic-addon1"
                required
                />
              </InputGroup>

              <InputGroup className='mb-3 d-flex flex-columns text-center align-items-center'>
                <div className='d-flex flex-column'>
                  <label>Adjunta tu Título Profesional y Documento de Colegiado</label>
                  <input className='inputFile' type='file' name='file' multiple={true} onChange={handleFiles}/>

                </div>
              </InputGroup>

            </div>
            <div className='mb-2'>
              {message1 && <p>Introduce correctamente todos los datos</p>}
              {message2 && <p>Ya existe una cuenta con este email</p>}
            </div>

            <div className='d-flex flex-column align-items-center justify-content-center text-center'>
                <button
                  className='defineButton'
                  onClick={onSubmit}
                >Regístrate</button>

              <hr className='lineFormRegister'/>

              <p>¿Ya tienes cuenta?</p>

              <button
                className='mb-3 defineButton'
                onClick={() => navigate('/')}
              >Login</button>
              </div>
          </div>
        </Col>
      </Row>

    </Container>
  )
}
