import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const initialValue = {
    text: '',
    university: '',
    start_date: '',
    end_date: ''
}

export const FormAddTitlesMedic = ({show, setShow, handleClose, handleShow}) => {

    const [titles, setTitles] = useState(initialValue);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTitles({...titles, [name]:value});
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Datos Académicos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup className='mb-3'>
              <Form.Control
              placeholder='Escribe nombre del Título Universitario'
              name='text'
              type='text'
              autoComplete='off'
              aria-label='text'
              aria-describedby="basic-addon1"
              value={titles?.text}
              onChange={handleChange}
              required
              />
            </InputGroup>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>
  )
}
