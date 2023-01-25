import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { CardHome } from '../../components/Cards/CardHome/CardHome';
import { useNavigate } from 'react-router-dom';
import '../../components/Cards/CardHome/CardHome.scss'

export const HomeMedic = () => {
  const [icon, setIcon] = useState("");
  const [cardTitle, setCardTitle] = useState("");
  const navigate = useNavigate();

  return (
    <div className='bgColorHome d-flex align-items-center'>
      <Container className='whiteContainerHome pt-4'>
          <Row>
              <CardHome
                // go={"/appointments"}
                navigate={()=>navigate("/medicAppointmentsHistory")}
                icon={'/assets/icons/add_task_black_24dp.svg'}
                cardTitle={"Citas Realizadas"}
              />

              <CardHome
                go={"/pendingAppointments"}
                navigate={navigate}
                icon={'/assets/icons/pending_actions_black_24dp.svg'}
                cardTitle={"Citas Pendientes de Confirmación"}
              />

              <CardHome
                go={"/followingAppointments"}
                navigate={navigate}
                icon={'/assets/icons/keyboard_tab_black_24dp.svg'}
                cardTitle={"Próximas Citas"}
              />

              <CardHome
                go={"/availability"}
                navigate={navigate}
                icon={'/assets/icons/event_available_black_24dp.svg'}
                cardTitle={"Disponibilidad"}
              />
          </Row>
      </Container>
    </div>
  )
}
