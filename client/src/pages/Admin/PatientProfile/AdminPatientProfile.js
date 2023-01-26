import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";


export const AdminPatientProfile = () => {

    const { user_id } = useParams();
    const navigate = useNavigate();
   const [user, setUser] = useState()

    useEffect(() => {
       
        axios
          .get(`http://localhost:4000/admin/patientProfile/${user_id}`)
          .then((res) => {
            setUser(res.data[0]);
            console.log("lo que trae el res.data", res.data[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
  return (
    <div className="bgPatientProfile d-flex justify-content-center align-items-center">
      <Container className="whiteBoxPatientProfile">
        <Row className="rowPatientProfile d-flex align-items-center mb-4">
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="colPatientProfile d-flex flex-row justify-content-center"
          >
            {user && (
              <div className="informationPatientProfile">
                <h2>Datos personales</h2>
                <hr />
                <h4>
                  {user?.name} {user?.lastname}
                </h4>
                <h4>D.N.I: {user?.dni}</h4>
                <h4>{user?.email}</h4>
                <h4>{user?.phone_number}</h4>
                <br />
                <h2>Dirección</h2>
                <hr />
                <h4>{user?.address}</h4>
                <h4>
                  {user?.city_name}, {user?.province_name} ({user?.postal_code})
                </h4>
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
                className="imagePatient"
                src={`/assets/images/user/${user?.avatar}`}
              />
            </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mb-2">
          <Button onClick={()=>navigate(-1)}>Volver</Button>
        </div>
      </Container>
    </div>
  );
}


