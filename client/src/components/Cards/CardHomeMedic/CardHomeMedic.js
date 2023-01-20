import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import '../CardHomeMedic/CardHomeMedic.scss'
import AddTaskIcon from '@mui/icons-material/AddTask';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export const CardHomeMedic = () => {
  return (
    <Container fluid className='bgColorHomeMedic d-flex justify-content-center align-items-center'>
      <div className='whiteContainerHomeMedic'>
        <Row>
          <Col className='d-flex justify-content-center my-3'>
            <div className='cardDateHomeMedic d-flex flex-row justify-content-between'>
              <div className='textHomeMedic'>
                <h2>Citas</h2>
                <h2>Realizadas</h2>
              </div>
              <div className='citasRealizadas'>
                <AddTaskIcon/>
              </div>
            </div>
          </Col>

          <Col className='d-flex justify-content-center my-3'>
            <div className='cardDateHomeMedic d-flex flex-row justify-content-between'>
                <div className='textHomeMedic'>
                  <h2>Citas</h2>
                  <h2>Pendientes de Validar</h2>
                </div>
                <div className='citasPendientes'>
                  <ContentPasteGoIcon/>
                </div>
              </div>
          </Col>
        </Row>

        <Row>
          <Col className='d-flex justify-content-center'>
            <div className='cardDateHomeMedic d-flex flex-row justify-content-between'>
              <div className='textHomeMedic'>
                <h2>Próximas</h2>
                <h2>Citas</h2>
              </div>
              <div className='proximasCitas'>
                <KeyboardTabIcon/>
              </div>
            </div>
          </Col>
          
          <Col className='d-flex justify-content-center'>
            <div className='cardDateHomeMedic d-flex flex-row justify-content-between'>
              <div className='textHomeMedic'>
                <h2>Disponibilidad</h2>
              </div>
              <div className='disponibilidad'>
                <EventAvailableIcon/>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
