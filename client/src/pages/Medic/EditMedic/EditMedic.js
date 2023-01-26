import React, { useContext, useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import { NetClinicsContext } from '../../../context/NetClinicsProvider'
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FormAddTitlesMedic } from '../../../components/Forms/FormAddTitlesMedic/FormAddTitlesMedic';
import { FormEditTitlesMedic } from '../../../components/Forms/FormEditTitlesMedic/FormEditTitlesMedic';

import './editMedicProfile.scss'
import { FormAddSpecialityMedic } from '../../../components/Forms/FormAddSpecialityMedic/FormAddSpecialityMedic';
import { FormAddProviderServiceMedic } from '../../../components/Forms/FormAddProviderServiceMedic/FormAddProviderServiceMedic';


export const EditMedic = () => {

  const navigate = useNavigate();


  const {token, user, setResetPage, resetPage} = useContext(NetClinicsContext);
  const [dataUser, setDataUser] = useState({});
  const [dataTitles, setDataTitles] = useState([]);
  const [dataSpecialities, setDataSpecialities] = useState([]);
  const [providerServices, setProviderServices] = useState([]);

  const [listCities, setListCities] = useState([]);
  const [listProvinces, setListProvinces] = useState([]);


  //Peticios Axios
  useEffect(() => {
    //Peticion para traer todas las provincias
    axios
    .get("http://localhost:4000/place/getAllProvince/")
    .then((res) => {
        setListProvinces(res.data);
    })
    .catch((error) => {
        console.log(error);
    });

    //Petición para traer todas las ciudades de una provincia concreta
    axios
    .get(`http://localhost:4000/place/getAllCity/${user?.province_id}`)
        .then((res) => {
        setListCities(res.data);
    })
      .catch((error) => {
        console.log(error);
    });  

    //petición para traer las provincias/ciudades donde presta servicio el médico
    if(!user.user_id) return
    axios
      .get(`http://localhost:4000/medic/providerServices/${user?.user_id}`)
      .then((res) => {
        setProviderServices(res.data);
      })
      .catch((error) => {
        console.log(error);
    });

  }, [user]);
  //--------------------------------------------------------------------------

  //Función para traer todas las ciudades de una provincia enviada como parámetro
  const getCity = (selectedProvince) => {
    if (selectedProvince) {
      axios
        .get(`http://localhost:4000/place/getAllCity/${selectedProvince}`)
        .then((res) => {
          setListCities(res.data);
          setDataUser({ ...dataUser, province_id: selectedProvince});
        })
        .catch((error) => {
          console.log(error);
        });
      }
  };
  //--------------------------------------------------------------------------

  //Objeto con el titulo y para abrir y cerrar modal
  const [editTitle, setEditTitle] = useState({
    open: false,
    title: null
  });
  //----------------------------------------------------------------------------

  //Modal para añadir datos academicos
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //----------------------------------------------------------------------------


  //Modal para añadir especialidades
  const [showSpecialities, setShowSpecialities] = useState(false);
  const handleCloseSpecialities = () => setShowSpecialities(false);
  const handleShowSpecialities = () => setShowSpecialities(true);
  //----------------------------------------------------------------------------

  //Modal para añadir provincia y ciudad donde preste servicios médico
  const [showProviderService, setShowProviderService] = useState(false);
  const handleCloseProviderService = () => setShowProviderService(false);
  const handleShowProviderService = () => setShowProviderService(true);

  //Función para setear edición título, objeto con modal y titulo
  const editTitleMedic = (title) =>{
    setEditTitle({open: true, title});
  }
  //----------------------------------------------------------------------------

  //Vista previa imagen cuando subo una nueva al input type file
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  //----------------------------------------------------------------------------


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
  //-------------------------------------------------------------------------

  //useEffect para devolver datos del perfil médico
  //se comprueba en la peticion el token para devolver datos del usuario
  //logueado
  useEffect(() => {

    axios.defaults.headers.common = {'Authorization': `bearer ${token}`};

    if(!user.user_id) return;

    axios
    .get("http://localhost:4000/medic/profile")
    .then((res) => {
        setDataUser(res.data.user[0]);
        setDataTitles(res.data.titles);
        setDataSpecialities(res.data.specialities);
    })
    .catch((error) => {
        console.log(error);
    });
  }, [user]);
  //----------------------------------------------------------------------------

  //Conforme se cambie la imagen setea el archivo seleccionado y la imagen
  //que se mandará a base de datos
  const onSelectFile = (e) => {
    if(!e.target.files || e.target.files.length === 0){
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    setImage(e.target.files[0]);

  };
  //----------------------------------------------------------------------------


  //handleChange usuario
  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataUser({...dataUser, [name]: value});
  };
  //----------------------------------------------------------------------------

  //Submit modificar cambios usuario
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
  //----------------------------------------------------------------------------

  //Borrar título
  const deleteTitle = (title, title_name) => {
    if(window.confirm(`¿Deseas borrar el dato académico ${title_name}?`)){
      axios
      .delete(`http://localhost:4000/title/${title}`)
      .then((res) => {
        setResetPage(!resetPage);
        })
    }
    
  }
  //----------------------------------------------------------------------------

  //Borrar especialidad
  const deleteSpeciality = (speciality_id, speciality_name) => {

    if(window.confirm(`¿Deseas borrar la especialidad ${speciality_name}?`)){
        axios
        .delete(`http://localhost:4000/speciality/${speciality_id}/${user.user_id}`)
        .then((res) => {
          setResetPage(!resetPage);
        })
    }
    
  }
  //----------------------------------------------------------------------------
  //Borrar una provincia y ciudad donde presta servicio médico
  const deleteProviderService = (province_id, province_name, city_id, city_name) => {
    if(window.confirm(`¿Deseas borrar la zona de servicio ${province_name} ${city_name}?`)){
      axios
      .delete(`http://localhost:4000/medic/providerServices/${user.user_id}/${province_id}/${city_id}`)
      .then((res) => {
        setResetPage(!resetPage);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
  //----------------------------------------------------------------------------

  //Activar & Desactivar vacaciones
  const vacation = () => {
    
    let url = `http://localhost:4000/admin/onVacation/${dataUser?.user_id}`;
    
    if (dataUser?.medic_is_on_vacation === 1) {
      url = `http://localhost:4000/admin/offVacation/${dataUser?.user_id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setResetPage(!resetPage);
      })
      .catch((err) => console.log(err));
  }

  //----------------------------------------------------------------------------


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
          <Col className='d-flex justify-content-end gap-5'>
              <Form>
                  <Form.Check 
                      defaultChecked
                      onClick={()=> navigate('/myProfile')}
                      type="switch"
                      id="custom-switch"
                      label="Ver Perfil"
                  />
              </Form>
              <Form>
                  <Form.Check 
                      checked={dataUser?.medic_is_on_vacation}
                      onClick={vacation}
                      type="switch"
                      id="custom-switch"
                      label="Vacaciones"
                  />
              </Form>
          </Col>
        </Row>

        {/* Datos Médico */}
        {/* Sobre mí */}
        <Row className='ms-2 me-2 mb-3 fondos_Sections'>
            <Col xs="12" md="12" className='mb-3'>
              <h4>Sobre mí</h4>
              <hr className='separador'/>
            </Col>
            <Col xs="12" md="12">
              <FloatingLabel  className="mb-3" controlId="floatingTextarea2">
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
            <label>Nombre:</label>
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
            <label>Apellidos:</label>
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
            <label>Teléfono:</label>
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
            <label>Email:</label>
            <InputGroup className='mb-3'>
              <Form.Control
              placeholder='Introduce Correo Electronico'
              name='email'
              type='text'
              autoComplete='off'
              aria-label='email'
              aria-describedby="basic-addon1"
              value={dataUser?.email}
              onChange={handleChange}
              required
              />
            </InputGroup>
          </Col>
          {/* Provincia Médico */}
          <Col xs="12" md="4">
            <label>Provincia:</label>
            <InputGroup className='mb-3'>
              <Form.Select value={dataUser?.province_id} onChange={(e) => getCity(e.target.value)} name="province_id" aria-label="Default select example">
                {listProvinces?.map((province) => {
                    return (
                      <option
                        key={province?.province_id}
                        value={province?.province_id} 
                      >
                        {province?.province_name}
                      </option>
                    );
                })}
              </Form.Select>
            </InputGroup>
          </Col>
          {/* Ciudad Médico */}
          <Col xs="12" md="4">
            <label>Ciudad:</label>
            <InputGroup className='mb-3'>
              <Form.Select value={dataUser?.city_id} name="city_id" onChange={handleChange} aria-label="Default select example">
                {listCities?.map((city) => {
                    return (
                      <option
                        key={city?.city_id}
                        value={city?.city_id} 
                      >
                        {city?.city_name}
                      </option>
                    );
                })}
              </Form.Select>
            </InputGroup>
          </Col>
          <Col xs="12" md="4">
            <label>Código Postal:</label>
            <InputGroup className='mb-3'>
              <Form.Control
              placeholder='Código Postal'
              name='postal_code'
              type='text'
              autoComplete='off'
              aria-label='postal_code'
              aria-describedby="basic-addon1"
              value={dataUser?.postal_code}
              onChange={handleChange}
              required
              />
            </InputGroup>
          </Col>
        </Row>
        {/* Datos Profesionales */}
        <Row className='fondos_Sections ms-2 me-2 mb-3'>
          <Col xs="12 mb-3">
            <h4>Datos Profesionales</h4>
            <hr className='separador'/>
          </Col>
          <Col xs="12" md="6">
            <label>Precio Consulta:</label>
            <InputGroup className='mb-3'>
              <Form.Control
              placeholder='Precio consulta'
              name='medic_price'
              type='text'
              autoComplete='off'
              aria-label='medic_price'
              aria-describedby="basic-addon1"
              value={dataUser?.medic_price}
              onChange={handleChange}
              required
              />
            </InputGroup>
          </Col>
          <Col xs="12" md="6">
            <label>Nº Colegiado:</label>
            <InputGroup className='mb-3'>
              <Form.Control
              disabled
              name='medic_membership_number'
              type='text'
              aria-label='medic_membership_number'
              aria-describedby="basic-addon1"
              value={dataUser?.medic_membership_number}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          {/* Botón para guardar cambios edición perfil*/}
          <Col className='gap-4 align-items-center justify-content-center d-flex'>
              <Button className="defineButton" onClick={onSubmit}>Guardar Cambios Perfil</Button>
              <Button className="defineButtonDanger" onClick={()=>navigate(-1)}>Cancelar Cambios</Button>
          </Col>
          
        </Row>
       
        {/* Titulos */}
        <Row className='ms-2 me-2 my-3 mb-3'>
          <Col sm="12" md="12" className='mb-3 fondos_Sections'>
            <h4>Datos Académicos</h4>
            <hr className='separador'/>
              <Table className='my-2 text-center my-3' striped bordered hover>
                        <thead>
                            <tr>
                                <th>Estudios</th>
                                <th>Universidad</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha Fin</th>
                                <th>Descargar</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody style={{cursor: 'pointer'}} >
                            {dataTitles?.map((title) => {
                            return  (
                              <>
                                <tr key={title.document}>
                                    <td>{title?.text}</td>
                                    <td>{title?.university}</td>
                                    <td>{title?.start_date === "" ? "Sin Fecha" : title?.start_date}</td>
                                    <td>{title?.end_date === "" ? "Sin Fecha" : title?.end_date}</td>
                                    <td><button onClick={()=>window.open(`/assets/docs/titles/${title.document}`)}><FilePresentRoundedIcon/></button></td>
                                    <td><button onClick={()=>editTitleMedic(title)}><EditRoundedIcon/></button></td>
                                    <td><button onClick={()=>deleteTitle(title?.title_id, title?.text)}><DeleteForeverRoundedIcon/></button></td>
                                </tr>

                                {editTitle.open &&
                                  <FormEditTitlesMedic
                                    editTitle={editTitle}
                                    setEditTitle={setEditTitle}
                                    title={editTitle.title}
                                    setResetPage={setResetPage}
                                    resetPage={resetPage}
                                  />
                                } 
                              </>
                            )
                            })}
                        </tbody>
              </Table>         
          </Col>
          {/* Boton para añadir datos académicos */}
          <Col sm="12" md="12" className='d-flex align-items-center justify-content-center gap-3'>
            <Button className="defineButton" onClick={handleShow}>Añadir Datos Académicos</Button>
          </Col>
        </Row>
        
        {/* Especialidades */}
        <Row className='ms-2 me-2 my-3 mb-3 fondos_Sections'>
          <Col sm="12" md="12" lg="6" className='mb-3'>
            
            {dataSpecialities.length !== 0 ?
              <>
              <h4>Especialidades</h4>
              <hr className='separador'/>
              <Table className='my-4' striped bordered hover>
                <thead>
                  <tr>
                      <th>Especialidad</th>
                      <th className='text-center'>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSpecialities.map((el) => {
                    return  <tr key={el.speciality_name}>
                              <td>{el.speciality_name}</td>
                              <td className='text-center'><button onClick={()=>deleteSpeciality(el.speciality_id, el.speciality_name)}><DeleteForeverRoundedIcon/></button></td>
                            </tr>
                  })}
                </tbody>
              </Table>
              {/* Boton para añadir Especialidades */}
              <div className='text-center'>
                <Button className='defineButton' onClick={handleShowSpecialities}>Añadir Especialidades</Button>
              </div>
              </>
              :
              <h4 className='text-center'>Actualmente no tienes agregada ninguna especialidad, agregue una</h4>
            }
          </Col>
          {/* ------------------------------------------------------------------ */}
          {/* Prestación servicios Provincias y Ciudades */}
          <Col>
              <h4>Prestación Servicios</h4>
              <hr className='separador'/>
              <Table className='my-4' striped bordered hover>
                <thead>
                  <tr>
                      <th>Provincia</th>
                      <th>Ciudad</th>
                      <th className='text-center'>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {providerServices.map((services, i) => {
                    return  <tr key={i}>
                              <td>{services.province_name}</td>
                              <td>{services.city_name}</td>
                              <td className='text-center'><button onClick={()=>deleteProviderService(services.province_id, services.province_name, services.city_id, services.city_name)}><DeleteForeverRoundedIcon/></button></td>
                            </tr>
                  })}
                </tbody>
              </Table>
              <div className='text-center'>
                <Button className='defineButton' onClick={handleShowProviderService}>Añadir Provincia/Ciudad</Button>
              </div>
          </Col>
        </Row>
      </Container>
    </div>
    {/* -------------------------------------------------------------------- */}
    {/* Modal para Añadir Titulos */}
    {show &&
      <FormAddTitlesMedic
        user={user}
        show={show}
        handleClose={handleClose}
        setResetPage={setResetPage}
        resetPage={resetPage}
      />
    } 

    {/* -------------------------------------------------------------------- */}
    {/* Modal para Añadir Especialidades */}
    {showSpecialities &&
      <FormAddSpecialityMedic
        user={user}
        resetPage={resetPage}
        setResetPage={setResetPage}
        showSpecialities={showSpecialities}
        handleCloseSpecialities={handleCloseSpecialities}
        handleShowSpecialities={handleShowSpecialities}
      />
    }
    {/* -------------------------------------------------------------------- */}
    {/* Modal para Añadir Prestacion de Servicios (Provincia, Ciudad)*/}
    {showProviderService &&
      <FormAddProviderServiceMedic
        user={user}
        resetPage={resetPage}
        setResetPage={setResetPage}
        showProviderService={showProviderService}
        handleCloseProviderService={handleCloseProviderService}
        handleShowProviderService={handleShowProviderService}
        listProvinces={listProvinces}
      />

    }
   
    </>
  )
}


              