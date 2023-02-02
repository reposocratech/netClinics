import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";

import "./styleAdminProfile.scss";

export const AdminProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(NetClinicsContext);
  const [provinceCity, setProvinceCity] = useState();

  // Realizo una busqueda para traer el nombre de la provincia y ciudad de un
  // usuario concreto
  useEffect(() => {
    if (!user.user_id) return;
    axios
      .get(`http://localhost:4000/place/getPlaceOneUser/${user.user_id}`)
      .then((res) => {
        setProvinceCity(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  // Botón para abrir o cerrar el editar perfil
  const refToggle = useRef(null);

  //Cuando pincho sobre el toggle realizo un navigate hacia edición de perfil
  const handleChangeToggle = () => {
    navigate("/editProfile");
  };

  return (
    <div className="bgPatientProfile d-flex justify-content-center align-items-center">
      <Container className="whiteBoxPatientProfile">
        <Row className="mt-3">
          <Col className="d-flex justify-content-end">
            <Form>
              <Form.Check
                ref={refToggle}
                onChange={handleChangeToggle}
                type="switch"
                id="custom-switch"
                label="Editar Perfil"
              />
            </Form>
          </Col>
        </Row>
        <Row className="rowPatientProfile d-flex align-items-center mb-4">
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="colPatientProfile d-flex flex-column justify-content-center"
          >
                <h3>Datos personales</h3>
                <hr />
                <h6>{user?.name} {user.lastname}</h6>
                <h6>D.N.I: {user?.dni === "null" ? "" : user?.dni}</h6>
                <h6>{user?.email}</h6>
                <h4>{user?.phone_number}</h4>
                <br />
                <h6>Dirección</h6>
                <hr />
                <h6>{user?.address === "null" ? "" : user?.address}</h6>
                <h6>
                  {provinceCity?.city_name}, {provinceCity?.province_name} (
                  {user?.postal_code})
                </h6>
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
                className="imagePatient mb-4"
                src={`assets/images/user/${user?.avatar}`}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
