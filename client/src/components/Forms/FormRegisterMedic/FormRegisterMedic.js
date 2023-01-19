import React from 'react'
import './StyleFormRegisterMedic.scss'

export const FormRegisterMedic = ({ registerMedic, message1, message2, listProvinces, listCities, navigate, handleChange, handleFiles, onSubmit, getCity, handleCities}) => {
  return (
    <div className='bgColor d-flex flex-column'>
        <button className='borderButton' onClick={() => navigate('/registerPatient')}>
        ¿Eres Paciente?. Regístrate aquí.
        </button>
      <div className='whiteBox d-flex flex-column justify-content-center'>
        <h2> Registro Fisio</h2>
        
          <input
          className='my-3'
          placeholder='Escribe tu Nombre'
          name='name'
          type='text'
          
          value={registerMedic.name}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Escribe tu Apellido'
          name='lastname'
          type='text'
          
          value={registerMedic.lastname}
          onChange={handleChange}
          />

        <input
          className='mb-3'
          placeholder='Introduce tu D.N.I'
          name='dni'
          type='text'
         
          value={registerMedic.dni}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu Nº de Teléfono'
          name='phone_number'
          type='text'
          
          value={registerMedic.phone_number}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Escribe tu Dirección'
          name='address'
          type='text'
          value={registerMedic.address}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu Código Postal'
          name='postal_code'
          type='text'
          value={registerMedic.postal_code}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu Nº de Colegiado'
          name='medic_membership_number'
          type='text'
          
          value={registerMedic.medic_membership_number}
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
          
          autoComplete='off'
          value={registerMedic.email}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu Contraseña'
          name='password'
          type='password'
          
          value={registerMedic.password}
          onChange={handleChange}
          />

          <label className='my-3'>Adjunta tu Título Profesional y Documento de Número de Colegiado</label>
          <input className='inputFile' type='file' name='file' multiple={true} onChange={handleFiles}/>

          <div className='mb-2'>
            {message1 && <p>Introduce todos los datos</p>}
            {message2 && <p>El email introducido no es válido</p>}
          </div>

            <button
                className='defineButton'
                onClick={onSubmit}
            >Regístrate</button>

            <hr/>
            <p>¿Ya tienes cuenta?</p>
            <button
                className='mb-3 defineButton'
                onClick={() => navigate('/loginPatient')}
            >Login</button>

      </div>
    </div>
  )
}
