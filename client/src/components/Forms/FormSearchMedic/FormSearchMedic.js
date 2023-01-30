import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export const FormSearchMedic = ({
  handleChange,
  onSubmit,
  listProvinces,
  listCities,
  getCity,
  listSpecialities,
  messageError,
}) => {

  return (
    <div className='bgSearcher'>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className='d-flex align-items-center justify-content-center'>
            <div className="whiteBoxSearcher d-flex flex-column align-items-center p-5 mt-5">
              <div>
                <h2 className='mb-5'>Reservar cita</h2>
              </div>

              <div className='d-flex flex-column'>
                <InputGroup className='mb-3'>
                  <div className='d-flex w-100'>
                  <InputGroup.Text id="basic-addon1" className='inputRegister iconSelect'><i className="fa-solid fa-city"></i></InputGroup.Text>
                    <Form.Select className='selectPatient' name='province_id'
                      onChange={(e)=>getCity(e.target.value)}>
                      <option>Indique una provincia</option>
                      {listProvinces?.map((province) => {
                        return (
                            <option key={province.province_id} value={province.province_id}>{province.province_name}</option>    
                        )
                      })}
                    </Form.Select>
                  </div>
                </InputGroup>
                  
                <InputGroup className='mb-3'>
                <div className='d-flex w-100'>
                <InputGroup.Text id="basic-addon1" className='inputRegister iconSelect'><i className="fa-solid fa-location-pin"></i></InputGroup.Text>
                    <Form.Select className='selectPatient' name='city_id'
                    onChange={handleChange}>
                      <option>Indique una ciudad</option>
                      {listCities?.map((city) => {
                        return (
                            <option key={city.city_id} value={city.city_id}>{city.city_name}</option>    
                        )
                      })}
                    </Form.Select>
                  </div>
                </InputGroup>

                <InputGroup className='mb-3'>
                <div className='d-flex w-100'>
                <InputGroup.Text id="basic-addon1" className='inputRegister iconSelect'><i className="fa-solid fa-id-card-clip"></i></InputGroup.Text>
                  <Form.Select className='selectPatient' name='speciality_id' onChange={handleChange}>
                    <option>Indique una especialidad</option>
                    {listSpecialities?.map((speciality) => {
                      return (
                          <option key={speciality.speciality_id}
                          value={speciality.speciality_id}>{speciality.speciality_name}</option>    
                      )
                    })}
                  </Form.Select>
                </div>
                </InputGroup>

                <InputGroup className='mb-3'>
                    <InputGroup.Text id="basic-addon1" className='inputRegister iconSelect'><i className="fa-solid fa-user-doctor"></i></InputGroup.Text>
                    <Form.Control
                      placeholder='Indique nombre del profesional'
                      name='name'
                      type='text'
                      autoComplete='off'
                      aria-label='Nombre'
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                    />
                </InputGroup>
              </div>

              <Button
              className='defineButton my-3' 
              onClick={onSubmit}
              >Buscar
              </Button>

              {messageError && <h5 className='text-danger'>{messageError}</h5>}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
