import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { CardHome } from "../../components/Cards/CardHome/CardHome";
import { useNavigate } from "react-router-dom";
import "../../components/Cards/CardHome/CardHome.scss";

export const HomeAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="bgColorHome d-flex align-items-center">
      <Container className="whiteContainerHome pt-4">
        <Row>
          <CardHome
            go={"/allPatients"}
            navigate={navigate}
            icon={"/assets/icons/people_black_24dp.svg"}
            cardTitle={"Pacientes"}
          />

          <CardHome
            go={"/allMedics"}
            navigate={navigate}
            icon={"/assets/icons/medical_services_black_24dp.svg"}
            cardTitle={"Profesionales"}
          />

          <CardHome
            go={"/validations"}
            navigate={navigate}
            icon={"/assets/icons/task_black_24dp.svg"}
            cardTitle={"Validaciones"}
          />

          <CardHome
            go={"/adminUtils"}
            navigate={navigate}
            icon={"/assets/icons/add_circle_outline_black_24dp.svg"}
            cardTitle={"Añadir especialidad"}
          />
        </Row>
      </Container>
    </div>
  );
};
