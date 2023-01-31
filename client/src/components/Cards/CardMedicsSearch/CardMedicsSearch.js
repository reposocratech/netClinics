import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import axios from "axios";
import { SearchAvailabilityMedicAppointment } from "../../Appointment/SearchAvailabilityMedicAppointment/SearchAvailabilityMedicAppointment";
import { CompleteAppointment } from "../../Appointment/CompleteAppointment/CompleteAppointment";
import "./cardMedicSearch.scss";

export const CardMedicsSearch = ({
  medicsSearched,
  setMedicsSearched,
  setSearch,
}) => {
  
  const [listSpecialities, setListSpecialities] = useState([]);

  //Estado con objeto para abrir componente de cita completada
  //le paso la cita, nombre del médico y apellidos
  const [showToast, setShowToast] = useState({
    open: false,
    appointment: null,
    medicName: null,
    medicLastName: null,
  });

  //Creo un estado con un objeto, propiedades open (para la modal) y médico
  //le añadire un medico con la función correspondiente cuando pinche
  //sobre un médico
  const [handleShowAvailability, setHandleShowAvailability] = useState({
    open: false,
    medic: null,
  });

  //useEffect para traer todas las especialidades y setearlas en su estado
  useEffect(() => {
    axios
      .get(`http://localhost:4000/speciality/getAllSpecialities`)
      .then((res) => {
        setListSpecialities(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //----------------------------------------------------------------------------

  //Función para reccorer lista de especialidades y traer el nombre
  //Le paso como parámetro el id de la especialidad
  const findSpeciality = (id_speciality) => {
    return listSpecialities?.find((el) => {
      return el.speciality_id === id_speciality && el
    })?.speciality_name;
  };
  //----------------------------------------------------------------------------

  //Función para abrir modal y pasarle al objeto handleShowAvailability el médico
  //sobre el que he pinchado
  const handleShowAvailabilityMedic = (medic) => {
    setHandleShowAvailability({ open: true, medic: medic });
  };
  //----------------------------------------------------------------------------

  //Función para cancelar busqueda
  const cancelSearch = () => {
    setMedicsSearched([]);
    setSearch({
      province_id: null,
      city_id: null,
      speciality_id: null,
      name: null,
    });
  };
  //----------------------------------------------------------------------------

  return (
    <>
      {!showToast.open && (
        <div className="bgSearcher pb-5">
          <div className="d-flex flex-column align-items-center">
            <Container className="whiteBoxSeracher d-flex flex-column align-items-center p-5 mt-5">
              <Row>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="text-center mb-3"
                >
                  <h2>Resultado de la búsqueda</h2>
                </Col>
              </Row>
              <Row>
                <Col className="contWrap d-flex flex-wrap align-items-center justify-content-center gap-5">
                  {medicsSearched?.map((medic, i) => {
                    return (
                      <div
                        key={medic.name + i}
                        className="d-flex flex-column justify-content-center cardMedic p-3 mb-3"
                      >
                        <div style={{ width: "16rem" }}>
                          <div className="cardImgMedic text-center p-3">
                            <img
                              alt="Avatar Médico"
                              className="imgMedic"
                              src={`/assets/images/user/${medic?.avatar}`}
                            />
                          </div>

                          <div className="mb-3 ms-2">
                            <Card.Title>Nombre:</Card.Title>
                            <Card.Text>
                              {medic?.name} {medic?.lastname}
                            </Card.Text>
                            <Card.Title>Número de colegiado:</Card.Title>
                            <Card.Text>
                              {medic?.medic_membership_number}
                            </Card.Text>
                            <Card.Title>Especialidad:</Card.Title>
                            <Card.Text>
                              {findSpeciality(medic?.speciality_id)}
                            </Card.Text>
                            <Card.Title>Precio consulta:</Card.Title>
                            <Card.Text>{medic?.medic_price}€</Card.Text>
                          </div>
                          <div className="text-center">
                            <button
                              className="defineButton"
                              onClick={() => handleShowAvailabilityMedic(medic)}
                            >
                              Ver su disponibilidad
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Col>
              </Row>
              <Row>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="d-flex justify-content-center mt-3"
                >
                  <button className="buttonCancel" onClick={cancelSearch}>
                    Cancelar
                  </button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
      {handleShowAvailability.open && (
        <SearchAvailabilityMedicAppointment
          handleShowAvailability={handleShowAvailability}
          setHandleShowAvailability={setHandleShowAvailability}
          showToast={showToast}
          setShowToast={setShowToast}
          setMedicsSearched={setMedicsSearched}
        />
      )}
      {showToast.open && (
        <CompleteAppointment
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
    </>
  );
};
