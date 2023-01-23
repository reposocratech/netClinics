import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import { NetClinicsContext } from '../../../context/NetClinicsProvider'

import './editMedicProfile.scss'
import axios from 'axios';

export const EditMedic = () => {

  const navigate = useNavigate();

  const {token, user} = useContext(NetClinicsContext);
  const [dataUser, setDataUser] = useState({});
  const [dataTitles, setDataTitles] = useState([]);
  const [dataSpecialities, setDataSpecialities] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
    if(!user.user_id) return;
    axios
    .get("http://localhost:4000/medic/profile")
    .then((res) => {
        setDataUser(res.data.user[0]);
        setDataTitles(res.data.titles);
        setDataSpecialities(res.data.specialities);
    })
    .catch((error) => {
        console.log(error);
    })
}, [user]);

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
        <Row>
          <Col>
            
          
          </Col>
        </Row>
      </Container>
    </div>
  )
}


              