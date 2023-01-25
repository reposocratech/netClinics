import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export const FormSearchMedic = ({
  handleChange,
  onSubmit,
  listProvinces,
  listCities,
  getCity,
  listSpecialities,
}) => {


  return (
    <>
        <Col xs={12} sm={12} md={12} lg={12} className='d-flex flex-column align-items-center text-center'>
          <div className="contEditPatient">
            <h2 className='mb-4'>Reservar cita</h2>
            <div className='d-flex flex-row align-items-start'>
              <img className='iconSearch me-2' src='/assets/icons/location_on_black_24dp.svg'/>
              <select
                className='selectSearcher mb-3'
                name='province_id'
                onChange={(e)=>getCity(e.target.value)}
              >
                <option>Indique una provincia</option>
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
              </select>
            </div>

            <div className='d-flex flex-row align-items-start'>
              <img className='iconSearch me-2' src='/assets/icons/my_location_black_24dp.svg'/>
              <select
                className='selectSearcher mb-3'
                name='city_id'
                onChange={handleChange}
              >
                <option>Indique una ciudad</option>
                {listCities?.map((city) => {
                    return (
                      <option
                        key={city.city_id}
                        value={city.city_id}
                      >
                        {city.city_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            
            <div className='d-flex flex-row align-items-start'>
              <img className='iconSearch me-2' src='/assets/icons/badge_black_24dp.svg'/>
              <select
                className='selectSearcher mb-3'
                name='speciality_id'
                onChange={handleChange}
              >
                <option>Indique una especialidad</option>
                {listSpecialities?.map((speciality) => {
                    return (
                      <option 
                        key={speciality.speciality_id}
                        value={speciality.speciality_id}
                      >
                          {speciality.speciality_name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className='d-flex flex-row align-items-start'>
              <img className='iconSearch me-2' src='/assets/icons/person_black_24dp.svg'/>
              <InputGroup className='inputSearcher mb-3'>
                <Form.Control
                  placeholder='Indique nombre del profesional'
                  name='name'
                  onChange={handleChange}
                />
              </InputGroup>
            </div>

            <Button
             className='defineButton' 
             onClick={onSubmit}
            >Buscar
            </Button>
          </div>
        </Col>
    </>
  )
}
