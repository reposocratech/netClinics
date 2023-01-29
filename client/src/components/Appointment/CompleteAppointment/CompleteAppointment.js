import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router';

export const CompleteAppointment = ({showToast, setShowToast}) => {

    let dateAppointment = showToast.appointment.date.split("-").reverse().join("-");

    const navigate = useNavigate();

  return (
    <div className='bgSearcher pb-5'>
        <div className="d-flex flex-column align-items-center">
      <Container  className="whiteBoxSeracher d-flex flex-column align-items-center p-5 mt-5">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className='text-center mb-3'>
            <h2>Gracias por su cita</h2>
            <h4>Has reservado cita con {showToast.medicName} {showToast.medicLastName} para el {dateAppointment} de {showToast.appointment.appointment_time}</h4>
            <p>*Recuerde, el profesional debera aceptar su cita</p>
          </Col>
        </Row>
        <Row>
          <Col className='contWrap d-flex flex-wrap align-items-center justify-content-center gap-5'>
              
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className='d-flex justify-content-center mt-3'>
            <button className='defineButton' onClick={()=>navigate("/userPendingAppointments")}>Ir a mis citas pendientes</button>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
  )
}
