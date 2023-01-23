import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";

import "./styleUserProfile.scss";

export const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(NetClinicsContext);
  const [provinceCity, setProvinceCity] = useState();

  useEffect(() => {
    if(!user.user_id) return
    axios
      .get(`http://localhost:4000/place/getPlaceOneUser/${user.user_id}`)
      .then((res) => {
        setProvinceCity(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <div className="bgPatientProfile d-flex justify-content-center align-items-center">
      <Container className="whiteBoxPatientProfile">
        <Row className="rowPatientProfile d-flex align-items-center">
          <Col xs={12} sm={12} md={6} lg={6} className='colPatientProfile d-flex flex-row justify-content-center'>
            {user && (
              <div className="informationPatientProfile">
                <Button onClick={()=>navigate("/editProfile")}>Editar perfil</Button>
                <h2>Datos personales</h2>
                <hr />
                <h4>
                  {user?.name} {user.lastname}
                </h4>
                <h4>D.N.I: {user?.dni}</h4>
                <h4>{user?.email}</h4>
                <h4>{user?.phone_number}</h4>
                <br />
                <h2>Dirección</h2>
                <hr />
                <h4>{user?.address}</h4>
                <h4>{provinceCity?.city_name}, {provinceCity?.province_name} ({user?.postal_code})</h4>
              </div>
            )}
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className='colPatientProfile d-flex flex-row justify-content-center'>
            <div className="imagePatientProfile">
              <img
                className="imagePatient"
                src={`assets/images/user/${user?.avatar}`}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
