import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Button, Card } from 'react-bootstrap'
import axios from 'axios'
import './cardMedicSearch.scss'

export const CardMedicsSearch = ({medicsSearched,setMedicsSearched}) => {
    const [listSpecialities, setListSpecialities] = useState([])
    useEffect(() => {
        axios
          .get(`http://localhost:4000/speciality/getAllSpecialities`)
          .then((res) => {
              setListSpecialities(res.data)
          })
          .catch((error) => {
          console.log(error);
          });
      }, [])
      const findSpeciality = (id_speciality) => {
         return listSpecialities?.find((el)=> {
            if(el.speciality_id === id_speciality){
                return el.speciality_name
            }
        })?.speciality_name;
      }
    
  return (
    <>
      <Row>
        <Col className='text-center mb-3'>
          <h2 >Resultado su búsqueda</h2>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className='d-flex flex-column justify-content-center align-items-center'>
          {medicsSearched?.map((medic,i) => {
              return(
                <div className='d-flex flex-column justify-content-center cardMedic p-3 mb-3'>
                  <card key={i} style={{ width: '12rem' }}>
                    <div className='cardImgMedic text-center p-3'>
                      <img className='imgMedic' src={`/assets/images/user/${medic?.avatar}`}/>
                    </div>

                    <div className='mb-3 ms-2'>
                      <Card.Title>Nombre:</Card.Title>
                      <Card.Text>{medic?.name}</Card.Text>
                      <Card.Title>Número de colegiado:</Card.Title>
                      <Card.Text>{medic?.medic_membership_number}</Card.Text>
                      <Card.Title>Especialidad:</Card.Title>
                      <Card.Text>{findSpeciality(medic?.speciality_id)}</Card.Text>
                    </div>

                    <div className='text-center'>
                      <button className='defineButton'>Disponibilidad</button>
                    </div>
                  </card>
                </div>
              )
          })}
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className='d-flex justify-content-center'>
          <button className='defineButton' onClick={()=>setMedicsSearched([])}>Cancelar</button>
        </Col>
      </Row>
    </>
  )
}
