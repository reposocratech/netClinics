import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Avatar from '@mui/material/Avatar';
import { reverseDate } from '../../../Utils/reverseDatePicker/reverseDatePicker';

import './medicAppointmentModal.scss'


export const MedicAppointmentView = ({handleShow, setHandleShow }) => {

  const {name, lastname, avatar, city_name, province_name, postal_code, address, appointment_commentary, appointment_date, appointment_time, phone_number} = handleShow.appointment;

  return (
    <Modal className='modalAppointment' show={handleShow.open} onHide={()=>setHandleShow({open:false, appointment: null})}>
      <Modal.Header closeButton>
        <Modal.Title>Cita con {name} {lastname}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-center mb-3">
          <Avatar
            className='avatarModal'
            alt="Remy Sharp"
            src={`/assets/images/user/${avatar}`}
            sx={{ width: 128, height: 128 }}
          />
        </div>
        <p><strong>Paciente</strong>: {name} {lastname}</p>
        <p><strong>Dirección</strong>: {address}</p>
        <p><strong>Ciudad</strong>: {city_name}</p>
        <p><strong>Provincia</strong>: {province_name}</p>
        <p><strong>Código Postal</strong>: {postal_code}</p>
        <p><strong>Teléfono de Contacto</strong>: {phone_number}</p>
        <p><strong>Dia de la cita</strong>: {reverseDate(appointment_date)}</p>
        <p><strong>Hora de la cita</strong>: {appointment_time}</p>
        <p><strong>Comentario</strong>: {appointment_commentary}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className='cancelButton' onClick={()=>setHandleShow({open:false, appointment: null})}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
};


