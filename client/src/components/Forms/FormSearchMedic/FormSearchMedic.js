import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

export const FormSearchMedic = ({
  handleChange,
  onSubmit,
  navigate,
  listProvinces,
  listCities,
  getCity,
  listSpecialities,
  medicsSearched,
  setMedicsSearched
}) => {
  return (
    <>
        <Row>
            <h2>Reservar cita</h2>
            <select
              className='m-2'
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
            <select
              className='m-2'
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
            <select 
              className='m-2'
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
            <input
              className='m-2'
              placeholder='Indique nombre del profesional'
              name='name'
              
              onChange={handleChange}
            />
            
            <Button
             className='m-2' 
             onClick={onSubmit}
            >Buscar
            </Button>
        </Row>
    </>
  )
}
