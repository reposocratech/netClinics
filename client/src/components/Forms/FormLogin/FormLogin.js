import React from 'react'
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import './FormLogin.scss'



export const FormLogin = ({handleChange, onSubmit, login, setLogin, errorMessage, setErrorMessage, navigate}) => {
  return (
    <Container fluid className='bgColorFormLogin d-flex align-items-center justify-content-center'>
        <Row>
            <Col className='d-flex align-items-center justify-content-center'>
                <div className='whiteBoxFormLogin d-flex flex-column'> 
                    <div className='titleFormLogin text-center mb-4'>
                        <img className='logoLoginForm' src='/assets/images/logo/Logo-NetClinics2-02.png'/>
                    </div>
                    <div className='d-flex flex-column'>
                        <input
                        className="mb-3"
                        placeholder="Escribe tu Email"
                        name="email"
                        type="email"
                        required
                        autoComplete="off"
                        value={login.email}
                        onChange={handleChange}
                        />

                        <input
                        className="mb-3"
                        placeholder="Introduce tu Contraseña"
                        name="password"
                        type="password"
                        required
                        value={login.password}
                        onChange={handleChange}
                        />

                        <div className='text-center'>
                            <button className="defineButton" onClick={onSubmit}>
                                Login
                            </button>
                        </div>
                    </div>
                    
                    <div className='mt-2 resetsPasswordFormLogin text-center'>
                        <p>¿Ha olvidado su contraseña?</p>
                        <p className='resetPassword' onClick={()=>navigate('/resetPassword')}>Recupérala aquí</p>
                    </div>

                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <hr className='lineFormLogin'/>
                    </div>
                    
                    <div className='text-center'>
                        <button className="defineButton" onClick={()=> navigate('/registerPatient')}>
                            Regístrate
                        </button>
                    </div>

                </div>
                
            </Col>
        </Row>
    </Container>
  );
}
