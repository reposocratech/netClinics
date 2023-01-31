import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const initialValue = {
  speciality_id: null,
};

export const FormAddSpecialityMedic = ({
  user,
  resetPage,
  setResetPage,
  showSpecialities,
  handleCloseSpecialities
}) => {

  //Modal para añadir especialidad al médico

  const [specialities, setSpecialities] = useState([]);
  const [addSpeciality, setAddSpeciality] = useState(initialValue);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/speciality/getAllSpecialities`)
      .then((res) => {
        setSpecialities(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddSpeciality({ ...addSpeciality, [name]: value });
    setMessageError("");
  };

  //Función para hacer submit
  const onSubmit = () => {
    //Parseamos la especialidad a númerico
    const speciality_id = parseInt(addSpeciality.speciality_id);

    //Si la especialidad no es númerica significa que no hemos agregado especialidad
    if (!isNaN(speciality_id)) {
      setMessageError("");
      axios
        .post(`http://localhost:4000/speciality/${user.user_id}`, addSpeciality)
        .then((res) => {
          setResetPage(!resetPage);
          handleCloseSpecialities();
        })
        .catch((err) => {
          if (err.response.data.error.code === "ER_DUP_ENTRY") {
            setMessageError("Ya tienes agregada la especialidad");
          } else {
            console.log(err);
          }
        });
    //Si no hemos seleccionado especialidad e intentamos submit saldrá el carte
    //de este else
    } else {
      setMessageError("¡Tienes que indicar una especialidad!");
    }
  };

  return (
    <Modal show={showSpecialities} onHide={handleCloseSpecialities}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Especialidad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select
          onChange={handleChange}
          name="speciality_id"
          aria-label="Default select example"
        >
          <option>Seleccione Especialidad</option>
          {specialities?.map((el) => {
            return (
              <option key={el.speciality_id} value={el.speciality_id}>
                {el.speciality_name}
              </option>
            );
          })}
        </Form.Select>
        <h4 className="my-4 text-center text-danger">{messageError}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseSpecialities}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Añadir Especialidad
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
