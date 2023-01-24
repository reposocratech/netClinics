import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { CardHome } from '../../components/Cards/CardHome/CardHome';
import { useNavigate } from 'react-router-dom';
import '../../components/Cards/CardHome/CardHome.scss'

export const HomeAdmin = () => {
  const [icon, setIcon] = useState("");
  const [cardTitle, setCardTitle] = useState("");
  const navigate = useNavigate();

  return (
    <div className='bgColorHome d-flex align-items-center'>
      <Container className='whiteContainerHome pt-4'>
          <Row>
              <CardHome
                go={"/appointments"}
                navigate={navigate}
                icon={'/assets/icons/people_black_24dp.svg'}
                cardTitle={"Pacientes"}
              />

              <CardHome
                go={"/pendingAppointments"}
                navigate={navigate}
                icon={'/assets/icons/medical_services_black_24dp.svg'}
                cardTitle={"Profesionales"}
              />

              <CardHome
                go={"/followingAppointments"}
                navigate={navigate}
                icon={'/assets/icons/task_black_24dp.svg'}
                cardTitle={"Validaciones"}
              />
          </Row>
      </Container>
    </div>
  )
}


