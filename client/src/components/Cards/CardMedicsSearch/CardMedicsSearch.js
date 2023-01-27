import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Card } from 'react-bootstrap'
import axios from 'axios'

import './cardMedicSearch.scss'
import { SearchAvailabilityMedicAppointment } from '../../Appointment/SearchAvailabilityMedicAppointment/SearchAvailabilityMedicAppointment';

export const CardMedicsSearch = ({medicsSearched,setMedicsSearched}) => {

    
    const [listSpecialities, setListSpecialities] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
    <div className='bgSearcher pb-5'>
      <div className="d-flex align-items-center">
        <Container  className="whiteBoxSeracher d-flex flex-column align-items-center p-5 mt-5">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center mb-3'>
              <h2 >Resultado de búsqueda</h2>
            </Col>
          </Row>
          <Row>
            <Col className='contWrap d-flex flex-wrap align-items-center justify-content-center gap-5'>
                {medicsSearched?.map((medic,i) => {
                    return(
                      <div key={medic.name + i} className='d-flex flex-column justify-content-center cardMedic p-3 mb-3'>
                        <Card style={{ width: '15rem' }}>
                          <div className='cardImgMedic text-center p-3'>
                            <img className='imgMedic' src={`/assets/images/user/${medic?.avatar}`}/>
                          </div>

                          <div className='mb-3 ms-2'>
                            <Card.Title>Nombre:</Card.Title>
                            <Card.Text>{medic?.name} {medic?.lastname}</Card.Text>
                            <Card.Title>Número de colegiado:</Card.Title>
                            <Card.Text>{medic?.medic_membership_number}</Card.Text>
                            <Card.Title>Especialidad:</Card.Title>
                            <Card.Text>{findSpeciality(medic?.speciality_id)}</Card.Text>
                          </div>
                          <div className='text-center'>
                              <button onClick={handleShow}>Ver disponibilidad</button>
                          </div>
                          {show &&
                            <SearchAvailabilityMedicAppointment
                              medic={medic}
                              show={show}
                              handleClose={handleClose}
                            />
                          }
                        </Card>
                      </div>
                    )
                })}
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className='d-flex justify-content-center mt-3'>
              <button className='defineButton' onClick={()=>setMedicsSearched([])}>Cancelar</button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
