import React, { useState } from 'react'
import { RegisterMedic } from '../../components/Register Medic/RegisterMedic';
import { RegisterPatient } from '../../components/Register Patient/RegisterPatient'
import './Styles/StylePatientRegister.scss'

export const Register = () => {
  const [showRegisterPatient, setShowRegisterPatient] = useState(true);
  const [showRegisterMedic, setShowRegisterMedic] = useState(false);

  return (
    <div>
      {showRegisterPatient && 
        <RegisterPatient
          showRegisterPatient={showRegisterPatient}
          setShowRegisterPatient={setShowRegisterPatient}
          showRegisterMedic={showRegisterMedic}
          setShowRegisterMedic={showRegisterMedic}
        />
      }
      {showRegisterMedic &&
        <RegisterMedic
          showRegisterMedic={showRegisterMedic}
          setShowRegisterMedic={setShowRegisterMedic}
          showRegisterPatient={showRegisterPatient}
          setShowRegisterPatient={setShowRegisterPatient}
        />
      }
    </div>
  )
}
