import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { useNavigate } from "react-router";
import { ValidationAdmins } from "../../../components/Tables/ValidationsAdmin/ValidationAdmins";

import "./styleValidations.scss";

export const Validations = () => {
  const { resetPage, setResetPage } = useContext(NetClinicsContext);
  const [medics, setMedics] = useState([]);
  const navigate = useNavigate();

  //Traigo todos los médicos pendientes de habilitar
  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllMedicsValidation")
      .then((res) => {
        setMedics(res.data);
      });
  }, [resetPage]);

  //Función para habilitar o deshabilitar un médico
  const enable = (id, is_enable, medic) => {

    //Si el médico no está habilitado lo habilita
    let url = `http://localhost:4000/admin/enableMedic/${id}`;
    //Si está habilitado lo deshabilita
    if (is_enable === 1) {
      url = `http://localhost:4000/admin/disableMedic/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        enableMedicEmail(medic);
        setResetPage(!resetPage);
      })
      .catch((Err) => console.log(Err));
  };

  //Función para mandar mail cuando se habilita/deshabilita el médico
  const enableMedicEmail = (medic) => {
    axios
      .post("http://localhost:4000/admin/enableMedicEmail", medic)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bgValidation d-flex justify-content-center">
      <Container>
        <Row className="">
          <Col>
            {/* Si medics trae resultado muestra los médicos pendientes
          de validar, si no, aparece mensaje */}
            {medics.length !== 0 ? (
              <ValidationAdmins
                medics={medics}
                navigate={navigate}
                enable={enable}
              />
            ) : (
              <h1 className="text-center p-3 mt-5 whiteBoxValidationText">
                Actualmente no hay validaciones de médicos pendientes
              </h1>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
