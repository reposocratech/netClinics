import { useEffect, useState } from "react";
import { Container, Row, Col} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./styleAdminPatientProfile.scss";

export const AdminPatientProfile = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();

  //Traido los datos de un paciente concreto
  useEffect(() => {
    axios
      .get(`http://localhost:4000/admin/patientProfile/${user_id}`)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  return (
    <div className="bgPatientProfile d-flex justify-content-center align-items-center">
      <Container className="whiteBoxPatientProfile">
        <Row className="rowPatientProfile d-flex align-items-center">
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="colPatientProfile d-flex flex-row justify-content-center"
          >
            {/* Muestro los datos del paciente */}
            {user && (
              <div className="informationPatientProfile">
                <h2>Datos personales</h2>
                <hr />
                <h6>
                  {user?.name} {user?.lastname}
                </h6>
                <h6>D.N.I: {user?.dni}</h6>
                <h6>{user?.email}</h6>
                <h6>{user?.phone_number}</h6>
                <br />
                <h2>Dirección</h2>
                <hr />
                <h6>{user?.address}</h6>
                <h6>
                  {user?.city_name}, {user?.province_name} ({user?.postal_code})
                </h6>
              </div>
            )}
          </Col>

          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="colPatientProfile d-flex flex-row justify-content-center"
          >
            <div className="imagePatientProfile">
              <img
                alt={user?.name}
                className="imagePatient"
                src={`/assets/images/user/${user?.avatar}`}
              />
            </div>
          </Col>
        </Row>
        {/*Botón para volver a la vista con todos los pacientes */}
        <div className="d-flex justify-content-center mb-4">
          <button className="deffineButton" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </Container>
    </div>
  );
};
