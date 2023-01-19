import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const initialMedicValue = {
    name: '',
    lastname: '',
    dni: '',
    membership_number: '',
    email: '',
    password: '',
}

export const RegisterMedic = ({showRegisterPatient, setShowRegisterPatient, showRegisterMedic, setShowRegisterMedic}) => {
    const [registerMedic, setRegisterMedic] = useState(initialMedicValue);
    const [message1, setMessage1] = useState(false);
    const [message2, setMessage2] = useState(false);

    const navigate = useNavigate();

    const showFormPatient = () => {
        setShowRegisterMedic(false);
        setShowRegisterPatient(true);
    }

    const handleChange = () => {

    }

    const onSubmit = () => {

    }
  return (
    <div className='bgColor d-flex flex-column'>
        <button className='borderButton' onClick={showFormPatient}>
        ¿Eres Paciente?. Regístrate aquí.
        </button>
      <div className='whiteBox d-flex flex-column justify-content-center'>
        
          <input
          className='my-3'
          placeholder='Escribe tu Nombre'
          name='name'
          type='text'
          required
          value={registerMedic.name}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Escribe tu Apellido'
          name='lastname'
          type='text'
          required
          value={registerMedic.lastname}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Escribe tu Email'
          name='email'
          type='email'
          required
          autoComplete='off'
          value={registerMedic.email}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu Contraseña'
          name='password'
          type='password'
          required
          value={registerMedic.password}
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
            onClick={() => navigate('/loginPatient')}
          >Login</button>

      </div>
    </div>
  )
}
