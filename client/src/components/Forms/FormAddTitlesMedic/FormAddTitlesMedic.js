import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';

const initialValue = {
    text: '',
    university: '',
    start_date: '',
    end_date: ''
}

export const FormAddTitlesMedic = ({show, handleClose}) => {

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
                <InputGroup.Text id="basic-addon1"><SchoolRoundedIcon/></InputGroup.Text>
                <Form.Control
                placeholder='Indique nombre del Título Universitario'
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
            <InputGroup className='mb-3'>
                <InputGroup.Text id="basic-addon1"><AccountBalanceRoundedIcon/></InputGroup.Text>
                <Form.Control
                placeholder='Indique nombre de la Universidad'
                name='university'
                type='text'
                autoComplete='off'
                aria-label='text'
                aria-describedby="basic-addon1"
                value={titles?.university}
                onChange={handleChange}
                required
                />
            </InputGroup>
            <InputGroup className='mb-3'>
                <InputGroup.Text id="basic-addon1"><CalendarMonthRoundedIcon/></InputGroup.Text>
                <Form.Control
                name='start_date'
                type='date'
                autoComplete='off'
                aria-label='text'
                aria-describedby="basic-addon1"
                value={titles?.start_date}
                onChange={handleChange}
                required
                />
            </InputGroup>
            <InputGroup className='mb-3'>
                <InputGroup.Text id="basic-addon1"><CalendarMonthRoundedIcon/></InputGroup.Text>
                <Form.Control
                name='end_date'
                type='date'
                autoComplete='off'
                aria-label='text'
                aria-describedby="basic-addon1"
                value={titles?.end_date}
                onChange={handleChange}
                required
                />
            </InputGroup>
            <InputGroup className='mb-3'>
                <InputGroup.Text id="basic-addon1"><PictureAsPdfRoundedIcon/></InputGroup.Text>
                <Form.Control
                name='file'
                type='file'
                autoComplete='off'
                aria-label='text'
                aria-describedby="basic-addon1"
                onChange={handleChange}
                required
                />
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Añadir Datos Académicos
          </Button>
        </Modal.Footer>
    </Modal>
  )
}
