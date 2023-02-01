import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./error404.scss";

export const Error = () => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => setIsLoading(false), 300);

  return (
    <div>
      {isLoading ? (
        <div></div>
      ) : (
        <Container
          fluid
          className="bgColorError d-flex align-items-center justify-content-center"
        >
          <Row>
            <Col>
              <div className="containerError text-center">
                <div className="titleFormLogin text-center mb-4">
                  <img
                    alt="logo-netclinics"
                    className="logoLoginForm"
                    src="/assets/images/logo/Logo-NetClinics2-02.png"
                  />
                </div>
                <h2 className="text-danger">Error 404!</h2>
                <h4>Lo sentimos la dirección indicada no es correcta</h4>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};
