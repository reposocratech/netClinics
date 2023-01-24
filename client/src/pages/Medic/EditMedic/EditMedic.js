import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import { NetClinicsContext } from '../../../context/NetClinicsProvider'
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


import './editMedicProfile.scss'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FormAddTitlesMedic } from '../../../components/Forms/FormAddTitlesMedic/FormAddTitlesMedic';

export const EditMedic = () => {

  const navigate = useNavigate();

  const {token, user, setResetPage, resetPage} = useContext(NetClinicsContext);
  const [dataUser, setDataUser] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();

  //useEffect para que esté pendiente la imagen seleccionada
  useEffect(() => {
    if(!selectedFile){
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);

  }, [selectedFile])
  

  //useEffect para devolver datos del perfil médico
  //se comprueba en la peticion el token para devolver datos del usuario
  //logueado
  useEffect(() => {

    axios.defaults.headers.common = {'Authorization': `bearer ${token}`};

    if(!user.user_id) return;

    axios
    .get("http://localhost:4000/medic/profile")
    .then((res) => {
        console.log(res.data);
        setDataUser(res.data.user[0]);
      
    })
    .catch((error) => {
        console.log(error);
    })
  }, [user]);


  //Conforme se cambie la imagen setea el archivo seleccionado y la imagen
  //que se mandará a base de datos
  const onSelectFile = (e) => {
    if(!e.target.files || e.target.files.length === 0){
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    setImage(e.target.files[0]);

  }

  //handleChange usuario
  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataUser({...dataUser, [name]: value});
  }

  //Submit modificar cambios
  const onSubmit = () => {

    const newFormData = new FormData();
    newFormData.append("file", image);
    newFormData.append("editMedic", JSON.stringify(dataUser));

    axios
      .put(`http://localhost:4000/medic/editMedic/${dataUser?.user_id}`, newFormData)
      .then((res) => {
        setResetPage(!resetPage);
        navigate('/myProfile');
      })
      .catch((error) => {
        console.log(error);
      });

  }

  console.log(dataUser);

  return (
    <>
    <div className='backgroundEditProfileMedic py-3 pb-3 pe-1 ps-1 d-flex align-items-center justify-content-center'>
      <Container className="aboutme-editprofile-medic pb-3">
        <Row className='p-3'>
          <Col sm="12" md="4">
                    <h2>Nº de Colegiado</h2>
                    <p>{dataUser?.medic_membership_number}</p>
          </Col>
          <Col className='text-center d-flex align-items center justify-content-center gap-5'>
            <div className="avatar-upload">
              <div className="avatar-edit">
                  <input type='file' onChange={onSelectFile} name="img" id="imageUpload" accept=".png, .jpg, .jpeg" />
                  <label htmlFor="imageUpload"></label>
              </div>
              <div className="avatar-preview">
                {preview &&
                  <div id="imagePreview" style={{backgroundImage: `url(${preview})`}}></div>
                }
                {!preview &&
                  <div id="imagePreview" style={{backgroundImage: `url(/assets/images/user/${dataUser?.avatar})`}}></div>
                } 
              </div>
            </div>
          </Col>
          <Col className='d-flex justify-content-end'>
              <Form>
                  <Form.Check 
                      defaultChecked
                      onClick={()=> navigate('/myProfile')}
                      type="switch"
                      id="custom-switch"
                      label="Ver Perfil"
                  />
              </Form>
          </Col>
        </Row>

        {/* Datos Médico */}
        {/* Sobre mí */}
        <Row className='ms-2 me-2 mb-3'>
          <Col className='fondos_Sections'>
            <Col className='mb-3'>
              <h4>Sobre mí</h4>
              <hr className='separador'/>
            </Col>
            <FloatingLabel  className="mb-3" controlId="floatingTextarea2" label="Sobre mí">
              <Form.Control
                as="textarea"
                name='medic_description'
                value={dataUser?.medic_description}
                onChange={handleChange}
                placeholder="Sobre mí"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Nombre y Apellidos */}
        <Row className='fondos_Sections ms-2 me-2 mb-3'>
          <Col xs="12 mb-3">
            <h4>Datos Personales</h4>
            <hr className='separador'/>
          </Col>
          <Col xs="12" md="6">
            <InputGroup className='mb-3'>
              <Form.Control
              placeholder='Escribe tu Nombre'
              name='name'
              type='text'
              autoComplete='off'
              aria-label='Nombre'
              aria-describedby="basic-addon1"
              value={dataUser?.name}
              onChange={handleChange}
              required
              />
            </InputGroup>
          </Col>
          <Col xs="12" md="6">
            <InputGroup className='mb-3'>
              <Form.Control
              placeholder='Escribe tus Apellidos'
              name='lastname'
              type='text'
              autoComplete='off'
              aria-label='Apellidos'
              aria-describedby="basic-addon1"
              value={dataUser?.lastname}
              onChange={handleChange}
              required
              />
            </InputGroup>
          </Col>
          <Col xs="12" md="6">
            <InputGroup className='mb-3'>
              <Form.Control
              placeholder='Introduce teléfono'
              name='phone_number'
              type='text'
              autoComplete='off'
              aria-label='Teléfono'
              aria-describedby="basic-addon1"
              value={dataUser?.phone_number}
              onChange={handleChange}
              required
              />
            </InputGroup>
          </Col>
          <Col xs="12" md="6">
            <InputGroup className='mb-3'>
              <Form.Control
              placeholder='Introduce DNI'
              name='dni'
              type='text'
              autoComplete='off'
              aria-label='DNI'
              aria-describedby="basic-addon1"
              value={dataUser?.email}
              onChange={handleChange}
              required
              />
            </InputGroup>
          </Col>
        </Row>
       
        {/* Titulos */}
        <Row className='ms-2 me-2 my-3 mb-3 fondos_Sections'>
          <Col className='mb-3'>
            <h4>Datos Académicos</h4>
            <hr className='separador'/>
          </Col>
          <Col sm="12" md="12" className='d-flex align-items-center justify-content-center gap-3'>
            <Button>Editar Datos Académicos</Button>
            <Button onClick={handleShow}>Añadir Datos Académicos</Button>
          </Col>
        </Row>
        {/* Botón para guardar cambios */}
        <Row>
          <Col>
              <Button onClick={onSubmit}>Guardar Cambios</Button>
          </Col>
        </Row>
      </Container>
    </div>
    {show &&
      <FormAddTitlesMedic
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    } 
    </>
  )
}


              