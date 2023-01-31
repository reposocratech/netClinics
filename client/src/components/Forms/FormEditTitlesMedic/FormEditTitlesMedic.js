import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import { maxDatePicker } from '../../../Utils/maxDatePicker/maxDatePicker';
import axios from "axios";

//Formulario de edición de títulos
export const FormEditTitlesMedic = ({
  title,
  editTitle,
  setEditTitle,
  resetPage,
  setResetPage,
}) => {
  const [file, setFile] = useState();
  const [editTitleForm, setEditTitleForm] = useState(title);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTitleForm({ ...editTitleForm, [name]: value });
  };

  const onSubmit = () => {
    const newFormData = new FormData();
    console.log("este es el file", file);
    newFormData.append("file", file);
    newFormData.append("editTitle", JSON.stringify(editTitleForm));

    axios
      .put(`http://localhost:4000/title/${editTitleForm.title_id}`, newFormData)
      .then((res) => {
        setEditTitle({ open: false });
        setResetPage(!resetPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal show={editTitle.open} onHide={() => setEditTitle({ open: false })}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Título</Modal.Title>
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
            value={editTitleForm?.text}
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
            value={editTitleForm?.university}
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
            value={editTitleForm?.start_date}
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
            min={editTitleForm?.start_date}
            type="date"
            autoComplete="off"
            aria-label="text"
            aria-describedby="basic-addon1"
            value={editTitleForm?.end_date}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <PictureAsPdfRoundedIcon />
          </InputGroup.Text>
          <Form.Control
            type="file"
            accept="application/pdf"
            autoComplete="off"
            aria-label="text"
            aria-describedby="basic-addon1"
            onChange={handleFile}
            required
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setEditTitle({ open: false })}
        >
          Cancelar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Editar Titulo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
