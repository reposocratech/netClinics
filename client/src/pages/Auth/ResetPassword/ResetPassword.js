import React, { useState } from 'react'
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const ResetPassword = () => {

    const [email, setEmail] = useState("");
    const [messageError, setMessageError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setMessageError("");
        setEmail(e.target.value);
    }

    const onSubmit = () => {
        if(email.trim("") !== ""){
            axios
            .put("http://localhost:4000/user/resetPassword", {email:email})
            .then((res) => {
                const data = {
                    password: res.data.password,
                    user: res.data.resultEmail[0],
                }

                sendEmailResetPassword(data);
                navigate("/");

            })
            .catch((error) => {
                setMessageError(error.response.data.error);  
            })
        }
        else{
            setMessageError("Debes completar el correo electronico");
        }
    }

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

  return (
    <Container fluid className='bgColorFormLogin d-flex align-items-center justify-content-center'>
        <Row>
            <Col className='d-flex align-items-center justify-content-center'>
                <div className='whiteBoxFormLogin d-flex flex-column'>

                
                    {/* Logo Netclinics */}
                    <div className='titleFormLogin text-center mb-4'>
                            <img className='logoLoginForm' src='/assets/images/logo/Logo-NetClinics2-02.png'/>
                    </div>
                    {/* Container Formulario */}
                    <div className='d-flex flex-column align-items-center mb-3'>
                        <InputGroup className="mb-3">

                            <InputGroup.Text id="basic-addon1" className='inputFormLogin'><i className="fa-solid fa-envelope"></i></InputGroup.Text>
                            
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
                        <h4 className='text-center text-danger'>{messageError}</h4>
                    </div>
                    <div className='text-center'>
                        <button onClick={onSubmit}>
                            Recuperar Contraseña
                        </button>
                        <button onClick={()=>navigate("/")}>
                            Ir al Login
                        </button>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
  )
}
