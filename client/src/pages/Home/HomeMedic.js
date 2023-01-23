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
    <Container fluid className='bgColorHome d-flex justify-content-center align-items-center'>
      <div className='whiteContainerHome d-flex flex-column justify-content-center'>
        <Row>
          <CardHome
            go={"/appointments"}
            navigate={navigate}
            icon={'/assets/icons/add_task_black_24dp.svg'}
            cardTitle={"Citas Realizadas"}
          />

          <CardHome
            go={"/pendingAppointments"}
            navigate={navigate}
            icon={'/assets/icons/pending_actions_black_24dp.svg'}
            cardTitle={"Citas Pendientes de Confirmación"}
          />
        </Row>

        <Row>
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

      </div>
    </Container>
  )
}
