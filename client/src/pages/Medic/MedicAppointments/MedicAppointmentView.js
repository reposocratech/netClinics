import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const MedicAppointmentView = ({handleShow, setHandleShow }) => {

  return (
    <Modal show={handleShow.open} onHide={()=>setHandleShow({open:false, appointment: null})}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>setHandleShow({open:false, appointment: null})}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


