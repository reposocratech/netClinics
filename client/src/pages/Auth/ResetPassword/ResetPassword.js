import React, { useState } from "react";
import { useNavigate } from "react-router";

import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import axios from "axios";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [messageError, setMessageError] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMessageError("");
    setEmail(e.target.value);
  };

  const onSubmit = () => {
    if (email.trim("") !== "") {
      axios
        .put("http://localhost:4000/user/resetPassword", { email: email })
        .then((res) => {
          const data = {
            password: res.data.password,
            user: res.data.resultEmail[0],
          };

          setOpen(true);
          sendEmailResetPassword(data);
          setEmail("");
        })
        .catch((error) => {
          setMessageError(error.response.data.error);
        });
    } else {
      setMessageError("Debes completar el correo electronico");
    }
  };

  const sendEmailResetPassword = (data) => {
    axios
      .post("http://localhost:4000/user/sendEmailResetPassword", data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container
      fluid
      className="bgColorFormLogin d-flex align-items-center justify-content-center"
    >
      <Row>
        {!open && (
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="d-flex align-items-center justify-content-center"
          >
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
              <div className="d-flex flex-column align-items-center mb-3">
                <InputGroup className="">
                  <InputGroup.Text id="basic-addon1" className="inputFormLogin">
                    <i className="fa-solid fa-envelope"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Escribe tu Email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    aria-label="Email"
                    value={email}
                    onChange={handleChange}
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <h4 className="text-center text-danger">{messageError}</h4>
              </div>
              <div className="d-flex flex-column align-items-center gap-3">
                <button className="deffineButton2" onClick={onSubmit}>
                  Recuperar Contraseña
                </button>
                <hr className="lineFormLogin" />
                <button className="deffineButton" onClick={() => navigate("/")}>
                  Ir a Login
                </button>
              </div>
            </div>
          </Col>
        )}
        {open && (
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="d-flex align-items-center justify-content-center"
          >
            <div>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Hemos restablecido su contraseña, acceda a su bandeja de
                    entrada.
                  </Alert>
                </Snackbar>
              </Stack>
            </div>
            <div className="whiteBoxFormLogin d-flex flex-column align-items-center">
              <div className="titleFormLogin text-center mb-4">
                <img
                  alt="logo-netclinics"
                  className="logoLoginForm"
                  src="/assets/images/logo/Logo-NetClinics2-02.png"
                />
              </div>
              <button className="deffineButton" onClick={() => navigate("/")}>
                Ir a Login
              </button>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};
