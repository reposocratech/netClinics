import React from 'react';
import { Button, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const FormChangePassword = ({onSubmit,handleChange,messageError}) => {
  return (
    <>
        <Col>
            <form>
                <div>
                    <label>Nueva contraseña:</label>
                    <InputGroup className=' mb-3'>
                        <Form.Control
                            placeholder="Contraseña"
                            name="password"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </div>

                <div>
                    <label>Repita su nueva contraseña:</label>
                    <InputGroup className='mb-3'>
                        <Form.Control
                            placeholder="Repite la contraseña"
                            name="checkPassword"  
                            onChange={handleChange}  
                        />
                    </InputGroup>
                </div>

                <Button className="defineButton m-2" onClick={onSubmit}>
                    Guardar cambios
                </Button>
            </form>
            <h3>{messageError}</h3>
        </Col>
    </>
  )
}
