import Modal from 'react-bootstrap/Modal';
import Avatar from '@mui/material/Avatar';
import { reverseDate } from '../../../Utils/reverseDatePicker/reverseDatePicker';

const UserAppointmentView = ({handleShow, setHandleShow, findMedicName }) => {
    const {user_medic_id, appointment_date, appointment_time, appointment_commentary} = handleShow.appointment;
  return (
    <Modal className='modalAppointment' show={handleShow.open} onHide={()=>setHandleShow({open:false, appointment: null})}>
      <Modal.Header closeButton>
        <Modal.Title>Cita con {findMedicName(user_medic_id)?.name} {findMedicName(user_medic_id)?.lastname}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-center mb-3">
          <Avatar
            className='avatarModal'
            alt="Remy Sharp"
            src={`/assets/images/user/${
                findMedicName(user_medic_id)?.avatar
              }`}
            sx={{ width: 128, height: 128 }}
          />
        </div>

        <p><strong>Profesional</strong>: {" "}{findMedicName(user_medic_id)?.name} {findMedicName(user_medic_id)?.lastname}</p>
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
  )
}

export default UserAppointmentView
