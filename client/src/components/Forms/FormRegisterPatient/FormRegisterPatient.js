import React from 'react'
import './StyleFormRegisterPatient.scss'

export const FormRegisterPatient = ({registerPatient, handleChange, getCity, handleCities, listCities, listProvinces, onSubmit, navigate, message1, message2}) => {
  return (
    <div className='bgColor d-flex flex-column'>
        <button className='borderButton' onClick={() => navigate('/registerMedic')}>
        ¿Eres Fisio?. Regístrate aquí.
        </button>
      <div className='whiteBox d-flex flex-column justify-content-center'>
        <h2> Registro Paciente</h2>

          <input
          className='my-3'
          placeholder='Escribe tu Nombre'
          name='name'
          type='text'
          required
          value={registerPatient.name}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Escribe tu Apellido'
          name='lastname'
          type='text'
          required
          value={registerPatient.lastname}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu D.N.I'
          name='dni'
          type='text'
          required
          value={registerPatient.dni}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu Nº de Teléfono'
          name='phone_number'
          type='text'
          required
          value={registerPatient.phone_number}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Escribe tu Dirección'
          name='address'
          type='text'
          value={registerPatient.address}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu Código Postal'
          name='postal_code'
          type='text'
          value={registerPatient.postal_code}
          onChange={handleChange}
          />

          <select className='mb-3' name='province'
          onChange={(e) => getCity(e.target.value)}>
            <option>Elige Provincia</option>
            {listProvinces?.map((province) => {
              return (
                  <option key={province.province_id} value={province.province_id}>{province.province_name}</option>    
              )
            })}
          </select>

          <select className='mb-3' name='cities'
          onChange={handleCities}>
            <option>Elige Ciudad</option>
            {listCities?.map((city) => {
              return (
                  <option key={city.city_id} value={city.city_id}>{city.city_name}</option>    
              )
            })}
          </select>

          <input
          className='mb-3'
          placeholder='Escribe tu Email'
          name='email'
          type='email'
          required
          autoComplete='off'
          value={registerPatient.email}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu Contraseña'
          name='password'
          type='password'
          required
          value={registerPatient.password}
          onChange={handleChange}
          />

          <div className='mb-2'>
            {message1 && <p>Introduce todos los datos</p>}
            {message2 && <p>Ya existe una cuenta con este email</p>}
          </div>

          <button
            className='defineButton'
            onClick={onSubmit}
          >Regístrate</button>

          <hr/>

          <button
            className='mb-3 defineButton'
            onClick={() => navigate('/')}
          >Login</button>

      </div>
    </div>
  )
}
