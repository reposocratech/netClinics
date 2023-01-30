import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Card } from 'react-bootstrap';
import { NetClinicsContext } from '../../../context/NetClinicsProvider';
import axios from 'axios';
import './myDatesPatient.scss';

export const UserFollowingAppointments = () => {
  const [appointmentData, setAppointmentData] = useState();
    const [listMedics, setListMedics] = useState([]);
    const { user } = useContext(NetClinicsContext);
    useEffect(() => {
      if(!user.user_id) return
      axios
        .get(`http://localhost:4000/patient/getConfirmedAppointments/${user.user_id}`)
        .then((res)=>{
            // console.log(res.data);
            setAppointmentData(res.data);
        })
        .catch((err) => console.log(err));

      axios
        .get(`http://localhost:4000/patient/getMedicsName`)
        .then((res)=>{
            // console.log(res.data);
            setListMedics(res.data);
        })
        .catch((err) => console.log(err));
    }, [])

    const findMedicName = (id_medic) => {
      return listMedics?.find((el)=> {
         if(el.user_id === id_medic){
             return `${el.name} ${el.lastname}`
         }
     });
   }
  return (
    <div className="bgAppointmentHistory p-2">
      <div className="d-flex flex-column align-items-center">
        {appointmentData?.length !== 0 ? 
          <Container className="whiteBoxAppointmentHistory d-flex flex-column align-items-center p-5 mt-5">
            <Row>
              <Col className='contWrap d-flex flex-wrap align-items-center justify-content-center gap-5'>
                {appointmentData?.map((appointment,i)=>{
                  return(
                    <div key={i} className='d-flex flex-column justify-content-center cardMedic p-3 mb-3'>
                      <div style={{ width: '16rem' }}>
                        <div className='cardImgMedic text-center p-3'>
                          <img alt={findMedicName(appointment.user_medic_id)?.name} className='imgMedic' src={`/assets/images/user/${findMedicName(appointment.user_medic_id)?.avatar}`}/>
                        </div>
                      </div>

                      <div className='mb-3 ms-2'>
                        <Card.Title>Nombre:</Card.Title>
                        <Card.Text>{findMedicName(appointment.user_medic_id)?.name} {findMedicName(appointment.user_medic_id)?.lastname}</Card.Text>
                        <Card.Title>Día:</Card.Title>
                        <Card.Text>{appointment.appointment_date}</Card.Text>
                        <Card.Title>Hora:</Card.Title>
                        <Card.Text>{appointment.appointment_time}</Card.Text>
                        {/* <Card.Title>Dirección:</Card.Title>
                        <Card.Text>{appointment.appointment_address}</Card.Text> */}
                        <Card.Title>Estado:</Card.Title>
                        <Card.Text>
                          <div className="d-flex justify-content-center">
                            {/* {!medic?.medic_enabled ?
                              <button onClick={() => enable(medic.user_id, medic.medic_enabled)} className="buttonDisabledUser">
                                  <div className="pointDisabled"></div>
                                  Confirmada
                              </button>
                              :
                              <button  onClick={() => enable(medic.user_id, medic.medic_enabled)} className="buttonEnabledUser">
                                <div className="pointEnable"></div>
                              Pendiente
                              </button>
                            } */}
                          </div>
                        </Card.Text>
                      </div>
                    </div>
                  )
                })}
              </Col>
            </Row>
          </Container>
          :
          <Container fluid className="withoutAppointments d-flex justify-content-center my-5">
          <h3>Actualmente no tienes citas confirmadas</h3>
          </Container>
        }
      </div>
    </div>
  );
};