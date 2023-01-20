import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import '../CardHomeMedic/CardHomeMedic.scss'
import AddTaskIcon from '@mui/icons-material/AddTask';


export const CardHomeMedic = ({tituloCard, navigate, direccion}) => {
  return (
    <Container onClick={()=> navigate({direccion})} fluid className='bgColorHomeMedic d-flex justify-content-center align-items-center'>
      <div className='whiteContainerHomeMedic'>
        <Row>
            <Col className='d-flex justify-content-center my-3'>
              <div className='cardDateHomeMedic d-flex flex-row justify-content-between'>
                <div className='textHomeMedic'>
                 <h2>{tituloCard}</h2>
                </div>
                <div className='citasRealizadas'>
                  <AddTaskIcon/>
                </div>
              </div>
            </Col>
          </Row>
      </div>
    </Container>
  )
}
