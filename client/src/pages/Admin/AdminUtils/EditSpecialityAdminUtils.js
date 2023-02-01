import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";


export const EditSpecialityAdminUtils = ({setModalEdit, modalEdit, setResetPage, resetPage}) => {

    
    const [editSpeciality, setEditSpeciality] = useState(modalEdit?.speciality);
    const [messageError, setMessageError] = useState("");

    const handleChange = (e) => {
        setMessageError("");
        setEditSpeciality({...editSpeciality, speciality_name: e.target.value});
    }

    const onSubmit = () => {
        
        if (editSpeciality.speciality_name.trim("") !== "") {
          axios
            .put(
              `http://localhost:4000/speciality/${editSpeciality.speciality_id}`, editSpeciality)
            .then((res) => {
              setModalEdit({ open: false, speciality: null });
              setResetPage(!resetPage);
            })
            .catch((error) => {
              console.log(error);
            });
        }   
        else{
            setMessageError("Debes indicar un nombre");
        }
    }

  return (
    <Modal show={modalEdit.open} onHide={()=>setModalEdit({open:false, speciality: null})}>
        <Modal.Header closeButton>
          <Modal.Title>Editar {modalEdit.speciality.speciality_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Indique nombre especialidad"
                    name="speciality_name"
                    type="text"
                    autoComplete="off"
                    aria-label="speciality_name"
                    aria-describedby="basic-addon1"
                    value={editSpeciality?.speciality_name}
                    onChange={handleChange}
                    />
            </InputGroup>
            {messageError && <h4 className='text-center text-danger'>{messageError}</h4>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setModalEdit({open:false, speciality: null})}>
            Close
          </Button>
          <Button className='defineButton' onClick={onSubmit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
    </Modal>
  )
}
