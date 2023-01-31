import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Card } from 'react-bootstrap';
import { NetClinicsContext } from '../../../context/NetClinicsProvider';
import axios from 'axios';
import { reverseDate } from '../../../Utils/reverseDatePicker/reverseDatePicker';

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
            setAppointmentData(res.data);
        })
        .catch((err) => console.log(err));

      axios
        .get(`http://localhost:4000/patient/getMedicsName`)
        .then((res)=>{
            setListMedics(res.data);
        })
        .catch((err) => console.log(err));
    }, [user])

    const findMedicName = (id_medic) => {
      return listMedics?.find((el)=> {
        return el.user_id === id_medic && el
     });
    }

    console.log(appointmentData);

  return (
    <div className="bgAppointmentHistory p-2">
      <div className="d-flex flex-column align-items-center">
        {appointmentData?.length !== 0 ? 
          <Container className="whiteBoxAppointmentHistory d-flex flex-column align-items-center p-5 mt-5">
            <Row>
              <h3 className="title text-center mb-4">Próximas citas</h3>
              <Col className='contWrap d-flex flex-wrap align-items-center justify-content-center gap-5'>
                {appointmentData?.map((appointment,i)=>{
                  return(
                    <div key={i} className='d-flex flex-column justify-content-center cardMedic p-3 mb-3'>
                      <div style={{ width: '16rem' }}>
                        <div className='d-flex justify-content-end'>
                          <div>
                            <div className='acceptButton text-center mt-1'><p>CONFIRMADA</p></div>
                          </div>
                        </div>
                        <div className='cardImgMedic text-center p-3'>
                          <img alt={findMedicName(appointment.user_medic_id)?.name} className='imgMedic' src={`/assets/images/user/${findMedicName(appointment.user_medic_id)?.avatar}`}/>
                        </div>
                      </div>

                      <div className='mb-3 ms-2'>
                        <Card.Title>Nombre:</Card.Title>
                        <Card.Text>{findMedicName(appointment.user_medic_id)?.name} {findMedicName(appointment.user_medic_id)?.lastname}</Card.Text>
                        <Card.Title>Día:</Card.Title>
                        <Card.Text>{reverseDate(appointment.appointment_date)}</Card.Text>
                        <Card.Title>Hora:</Card.Title>
                        <Card.Text>{appointment.appointment_time}</Card.Text>
                      </div>
                    </div>
                  )
                })}
              </Col>
            </Row>
          </Container>
          :
          <Container className="withoutAppointments d-flex justify-content-center mt-5">
          <h3>Actualmente no tienes citas confirmadas</h3>
          </Container>
        }
      </div>
    </div>
  );
};