import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import { maxDatePicker } from '../../../Utils/maxDatePicker/maxDatePicker';
import axios from "axios";

//Valor inicial que declaro para el titulo que vaya añadir
const initialValue = {
  text: "",
  university: "",
  start_date: "",
  end_date: "",
};

export const FormAddTitlesMedic = ({
  show,
  handleClose,
  user,
  setResetPage,
  resetPage,
}) => {
  
  const [titles, setTitles] = useState(initialValue);
  const [file, setFile] = useState();
  const [messageError, setMessageError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTitles({ ...titles, [name]: value });
    setMessageError("");
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setMessageError("");
  };

  //Función para agregar titulos a un médico
  const onSubmit = () => {
    if (
      file !== undefined &&
      titles.text.trim("") &&
      titles.university.trim("") &&
      titles.start_date
    ) {
      setMessageError("");
      const newFormData = new FormData();
      newFormData.append("file", file);
      newFormData.append("addTittle", JSON.stringify(titles));

      axios
        .post(`http://localhost:4000/title/${user.user_id}`, newFormData)
        .then((res) => {
          setResetPage(!resetPage);
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setMessageError("Debes completar todos los campos");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Datos Académicos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <SchoolRoundedIcon />
          </InputGroup.Text>
          <Form.Control
            placeholder="Indique nombre del Título Universitario"
            name="text"
            type="text"
            autoComplete="off"
            aria-label="text"
            aria-describedby="basic-addon1"
            value={titles?.text}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <AccountBalanceRoundedIcon />
          </InputGroup.Text>
          <Form.Control
            placeholder="Indique nombre de la Universidad"
            name="university"
            type="text"
            autoComplete="off"
            aria-label="text"
            aria-describedby="basic-addon1"
            value={titles?.university}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <CalendarMonthRoundedIcon />
          </InputGroup.Text>
          <Form.Control
            name="start_date"
            max={maxDatePicker()}
            type="date"
            autoComplete="off"
            aria-label="text"
            aria-describedby="basic-addon1"
            value={titles?.start_date}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <CalendarMonthRoundedIcon />
          </InputGroup.Text>
          <Form.Control
            name="end_date"
            min={titles?.start_date}
            type="date"
            autoComplete="off"
            aria-label="text"
            aria-describedby="basic-addon1"
            value={titles?.end_date}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <PictureAsPdfRoundedIcon />
          </InputGroup.Text>
          <Form.Control
            name="file"
            type="file"
            accept="application/pdf"
            autoComplete="off"
            aria-label="text"
            aria-describedby="basic-addon1"
            onChange={handleFile}
            required
          />
        </InputGroup>
        <h4 className="text-center text-danger">{messageError}</h4>
      </Modal.Body>
      <Modal.Footer>
        <button className="defineButtonModalAvailabilityMedicCancel" onClick={handleClose}>
          Cancelar
        </button>
        <button className="defineButtonModalAvailabilityMedicSubmit" onClick={onSubmit}>
          Añadir
        </button>
      </Modal.Footer>
    </Modal>
  );
};
