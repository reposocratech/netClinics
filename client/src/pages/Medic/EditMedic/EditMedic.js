import React, { useContext } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import { NetClinicsContext } from '../../../context/NetClinicsProvider'

import './editMedicProfile.scss'

export const EditMedic = () => {

  const navigate = useNavigate();

  const {token, user} = useContext(NetClinicsContext);

  return (
    <div className='backgroundEditProfileMedic py-3 pb-3 pe-1 ps-1 d-flex align-items-center justify-content-center'>
      <Container Fluid className="aboutme-editprofile-medic pb-3">
        <Row className='p-3'>
          <Col className='d-flex justify-content-end'>
              <Form>
                  <Form.Check 
                      defaultChecked
                      onClick={()=> navigate('/myProfile')}
                      type="switch"
                      id="custom-switch"
                      label="Ver Perfil"
                  />
              </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}


              