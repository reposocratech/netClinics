import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const FormChangePassword = ({
  onSubmit,
  handleChange,
  messageError,
}) => {
    
  //Formulario de cambio de contraseña
  
  return (
    <div className="bgPassword d-flex justify-content-center align-items-center">
      <Container className="whiteBoxPassword">
        <Row className="rowPassword d-flex align-items-center m-4">
          <Col className="d-flex justify-content-center">
            <Form>
              <div>
                <h3 className="mb-4">Cambio de contraseña</h3>
                <label>Nueva contraseña:</label>
                <InputGroup className="my-3">
                  <InputGroup.Text id="basic-addon1" className="inputRegister">
                    <i class="fa-solid fa-lock"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Contraseña"
                    type="password"
                    autoComplete="off"
                    aria-label="Contraseña"
                    name="password"
                    aria-describedby="basic-addon1"
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </div>

              <div>
                <label>Repita su nueva contraseña:</label>
                <InputGroup className="my-3">
                  <InputGroup.Text id="basic-addon1" className="inputRegister">
                    <i class="fa-solid fa-lock"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Repita la contraseña"
                    type="password"
                    autoComplete="off"
                    aria-label="Contraseña"
                    name="checkPassword"
                    aria-describedby="basic-addon1"
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </div>

              <div className="d-flex justify-content-center mb-3">
                <button className="deffineButton" onClick={onSubmit}>
                  Guardar cambios
                </button>
              </div>
              <p className="text-center text-danger"><strong>{messageError}</strong></p>
            </Form>
           
          </Col>
        </Row>
      </Container>
    </div>
  );
};
