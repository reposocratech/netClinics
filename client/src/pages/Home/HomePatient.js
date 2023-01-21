import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { CardHome } from '../../components/Cards/CardHome/CardHome';
import { useNavigate } from 'react-router-dom';
import '../../components/Cards/CardHome/CardHome.scss'


export const HomePatient = () => {
  const [icon, setIcon] = useState("");
  const [cardTitle, setCardTitle] = useState("");
  const navigate = useNavigate();

  return (
    <Container fluid className='bgColorHome d-flex justify-content-center align-items-center'>
      <div className='whiteContainerHome d-flex flex-column justify-content-center'>
        <Row>
          <CardHome
            navigate={navigate}
            icon={'/assets/icons/add_task_black_24dp.svg'}
            cardTitle={"Citas Realizadas"}
          />

          <CardHome
            navigate={navigate}
            icon={'/assets/icons/pending_actions_black_24dp.svg'}
            cardTitle={"Citas Pendientes de Confirmación"}
          />
        </Row>

        <Row>
          <CardHome
            navigate={navigate}
            icon={'/assets/icons/keyboard_tab_black_24dp.svg'}
            cardTitle={"Próximas Citas"}
          />
        </Row>
      </div>
    </Container>
  )
}
