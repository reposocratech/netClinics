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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <Container>
      <Row>
        <Col>
          {user && (
            <div>
              <Button onClick={()=>navigate("/editProfile")}>Editar perfil</Button>
              <h2>Datos personales</h2>
              <hr />
              <h4>
                {user?.name} {user.lastname}
              </h4>
              <h4>{user?.dni}</h4>
              <h4>{user?.email}</h4>
              <h4>{user?.phone_number}</h4>
              <br />
              <br />
              <h2>Dirección</h2>
              <hr />
              <h4>{user?.address}</h4>
              <h4>{provinceCity?.city_name}, {provinceCity?.province_name} ({user?.postal_code})</h4>
            </div>
          )}
        </Col>
        <Col className="p-5">
          <img
            className="w-50"
            src={`assets/images/user/${user?.avatar}`}
          />
        </Col>
      </Row>
    </Container>
  );
};
