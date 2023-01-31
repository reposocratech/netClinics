import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./FormLogin.scss";

export const FormLogin = ({
  handleChange,
  onSubmit,
  login,
  navigate,
  errorPassword,
  errorEmail,
  errorMessage,
}) => {
  return (
    <Container
      fluid
      className="bgColorFormLogin d-flex align-items-center justify-content-center"
    >
      <Row>
        <Col className="d-flex align-items-center justify-content-center">
          <div className="whiteBoxFormLogin d-flex flex-column">
            {/* Logo Netclinics */}
            <div className="titleFormLogin text-center mb-4">
              <img
                alt="logo-netclinics"
                className="logoLoginForm"
                src="/assets/images/logo/Logo-NetClinics2-02.png"
              />
            </div>

            {/* Container Formulario */}
            <div className="d-flex flex-column align-items-center">
              <InputGroup className={`mb-3 ${errorEmail && "errorLogin"}`}>
                <InputGroup.Text id="basic-addon1" className="inputFormLogin">
                  <i className="fa-solid fa-envelope"></i>
                </InputGroup.Text>

                <Form.Control
                  placeholder="Escribe tu Email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  aria-label="Email"
                  value={login.email}
                  onChange={handleChange}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              {errorEmail && (
                <h5 className="text-center text-danger pb-2">{errorEmail}</h5>
              )}

              <InputGroup className={`mb-3 ${errorPassword && "errorLogin"}`}>
                <InputGroup.Text id="basic-addon1" className="inputFormLogin">
                  <i className="fa-solid fa-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Introduce tu Contraseña"
                  name="password"
                  type="password"
                  autoComplete="off"
                  aria-label="Contraseña"
                  value={login.password}
                  onChange={handleChange}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              {errorPassword && (
                <h5 className="text-center text-danger pb-2">
                  {errorPassword}
                </h5>
              )}
              {errorMessage && (
                <h5 className="text-center text-danger pb-2">{errorMessage}</h5>
              )}

              <div className="text-center">
                <button className="deffineButton" onClick={onSubmit}>
                  Login
                </button>
              </div>
            </div>

            <div className="mt-2 resetsPasswordFormLogin text-center">
              <p>¿Ha olvidado su contraseña?</p>
              <p
                className="resetPassword"
                onClick={() => navigate("/resetPassword")}
              >
                Recupérala aquí
              </p>
            </div>

            <div className="d-flex flex-column align-items-center justify-content-center">
              <hr className="lineFormLogin" />
            </div>

            <div className="text-center">
              <button
                className="deffineButton"
                onClick={() => navigate("/registerPatient")}
              >
                Regístrate
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
