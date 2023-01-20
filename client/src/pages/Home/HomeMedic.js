import React, { useState } from 'react'
import { CardHomeMedic } from '../../components/Cards/CardHomeMedic/CardHomeMedic'
import {useNavigate} from 'react-router-dom'


export const HomeMedic = () => {

  const [icono, setIcono] = useState("")
  const navigate = useNavigate();

  return (
    <div>
        
        <CardHomeMedic
          navigate={navigate}
          tituloCard = "Citas Realizadas"
          direccion="/citasRealizadas"
          icono ={icono}
        />
    </div>
  )
}
