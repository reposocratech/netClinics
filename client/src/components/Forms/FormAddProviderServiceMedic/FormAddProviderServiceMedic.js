import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

const initialValue = {
    province_id: null,
    city_id: null,
};

export const FormAddProviderServiceMedic = ({
  user,
  resetPage,
  setResetPage,
  showProviderService,
  handleCloseProviderService,
  listProvinces,
}) => {

  //Modal para agregar zonas de servicio médico

  const [providerService, setProviderService] = useState(initialValue);
  const [listCities, setListCities] = useState([]);
  const [messageError, setMessageError] = useState("");

  //Función para traer todas las ciudades de una provincia enviada como parámetro
  const getCity = (selectedProvince) => {
    setMessageError("");
    setListCities([]);
    selectedProvince = parseInt(selectedProvince);
    if (!isNaN(selectedProvince)) {
      axios
        .get(`http://localhost:4000/place/getAllCity/${selectedProvince}`)
        .then((res) => {
          setListCities(res.data);
          setProviderService({
            ...providerService,
            province_id: selectedProvince,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setListCities([]);
      setProviderService(initialValue);
    }
  };
  //--------------------------------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProviderService({ ...providerService, [name]: value });
    setMessageError("");
  };

  //Función para cuando hacemos submit
  const onSubmit = () => {
    if (
      providerService.province_id !== null &&
      providerService.city_id !== null
    ) {
      setMessageError("");
      axios
        .post(
          `http://localhost:4000/medic/providerServices/${user?.user_id}`,
          providerService
        )
        .then((res) => {
          setResetPage(!resetPage);
          handleCloseProviderService();
        })
        .catch((err) => {
          if (err.response.data.error.code === "ER_DUP_ENTRY") {
            setMessageError(
              "Ya tienes agregado un servicio para la Ciudad indicada"
            );
          } else {
            console.log(err);
          }
        });
    } else {
      setMessageError("Debes rellenar los campos");
    }
  };

  return (
    <Modal show={showProviderService} onHide={handleCloseProviderService}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Provincia/Ciudad Prestación Servicios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <Form.Select
            onChange={(e) => getCity(e.target.value)}
            name="province_id"
            aria-label="Default select example"
          >
            <option>Seleccione Provincia</option>
            {listProvinces?.map((province,i) => {
              return (
                <option
                  key={i*8000}
                  value={province?.province_id}
                >
                  {province?.province_name}
                </option>
              );
            })}
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Select
            name="city_id"
            onChange={handleChange}
            aria-label="Default select example"
          >
            <option>Seleccione Ciudad</option>
            {listCities?.map((city, i) => {
              return (
                <option key={i*7000} value={city?.city_id}>
                  {city?.city_name}
                </option>
              );
            })}
          </Form.Select>
        </InputGroup>
        <h4 className="text-center text-danger">{messageError}</h4>
      </Modal.Body>
      <Modal.Footer>
        <button className="defineButtonModalAvailabilityMedicCancel" onClick={handleCloseProviderService}>
          Cancelar
        </button>
        <button className="defineButtonModalAvailabilityMedicSubmit" onClick={onSubmit}>
          Añadir Servicio
        </button>
      </Modal.Footer>
    </Modal>
  );
};
