import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NetClinicsContext } from '../../../context/NetClinicsProvider'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import {useNavigate} from 'react-router-dom';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';

import './medicProfile.scss'


export const MedicProfile = () => {

    const {token, user} = useContext(NetClinicsContext);
    const [dataUser, setDataUser] = useState({});
    const [dataTitles, setDataTitles] = useState([]);
    const [dataSpecialities, setDataSpecialities] = useState([]);
    const [providerServices, setProviderServices] = useState([]);
   
    const [provinceCity, setProvinceCity] = useState()

    const navigate = useNavigate();

    //traigo los datos del médico logueado
    useEffect(() => {
        axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
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
        })
    }, [user]);

    //traigo el nombre de la ciudad y provincia del usuario logueado
    useEffect(() => {
        if(!user.user_id) return
        axios
          .get(`http://localhost:4000/place/getPlaceOneUser/${user.user_id}`)
          .then((res) => {
            setProvinceCity(res.data[0]);
          })
          .catch((error) => {
            console.log(error);
          });
    }, [user]);

    //traigo las ciudades y provincias donde presta servicio el médico
    useEffect(() => {
        if(!user.user_id) return
        axios
          .get(`http://localhost:4000/medic/providerServices/${user.user_id}`)
          .then((res) => {
            setProviderServices(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }, [user]);

    //compruebo el cambio del toggle para navegar a editar perfil
    const handleChangeToggle = () => {
        navigate("/editProfile");
    }
    
  return (
    <div className='profile-medic-background py-3 pb-3 pe-1 ps-1 d-flex align-items-center justify-content-center'>
        <Container className="aboutme-profile pb-3">
            <Row className='p-3'>
                <Col sm="12" md="4">
                    <h2>Nº de Colegiado</h2>
                    <p>{dataUser?.medic_membership_number}</p>
                </Col>
                <Col sm="12" md="4" className='text-center'>
                    <div className='containerAvatarPerfil'>
                        <img className="avatarPefil" src={`/assets/images/user/${dataUser?.avatar}`}/>
                    </div>
                    <h2 className='my-4'><strong className="name">{dataUser?.name}</strong> <strong className="lastname">{dataUser?.lastname}</strong></h2>
                </Col>
                <Col sm="12" md="4" className='d-flex justify-content-end'>
                    <Form>
                        <Form.Check 
                            onChange={handleChangeToggle}
                            type="switch"
                            id="custom-switch"
                            label="Editar Perfil"
                        />
                    </Form>
                </Col>
            </Row>
            <Row className='ms-2 me-2 mb-3'>
                <Col sm="12" md="12" className='section'>
                    <h4>Sobre mí</h4>
                    <hr className='separador'/>
                    <p>{dataUser?.medic_description}</p>
                </Col>
            </Row>
            <Row className='ms-2 me-2 d-flex flex-row justify-content-between gap-3'>
                <Col sm="12" md="12" lg="3" className='section'>
                    <h4>Datos Personales</h4>
                    <hr className='separador mb-3'/>
                    <label className='campos'>Nombre:</label>
                    <p>{dataUser?.name}</p>
                    <label className='campos'>Apellidos:</label>
                    <p>{dataUser?.lastname}</p>
                    <label className='campos'>Teléfono:</label>
                    <p>{dataUser?.phone_number}</p>
                    <label className='campos'>Email:</label>
                    <p>{dataUser?.email}</p>
                    <label className='campos'>Ciudad:</label>
                    <p>{provinceCity?.city_name}</p>
                    <label className='campos'>Provincia:</label>
                    <p>{provinceCity?.province_name}</p>
                    <label className='campos'>Código Postal:</label>
                    <p>{user?.postal_code}</p>
                </Col>
                <Col sm="12" md="12" lg="3" className='section'>
                    <h4>Listado Especialidades</h4>
                    <hr className='separador'/>
                    <label className='campos'>Especialidades:</label>
                    <ul className='my-3'>
                    {dataSpecialities?.map((speciality) => {
                        return  (
                            
                            <li key={speciality?.speciality_name}>{speciality?.speciality_name}</li>
                        )
                    })}
                    </ul>
                </Col>
                <Col sm="12" md="12" lg="3" className='section'>
                    <h4>Prestación Servicios</h4>
                    <hr className='separador mb-3'/>
                    <label className='campos'>Provincia & Ciudad Servicios:</label>
                    <ul className='my-3'>
                        {providerServices?.map((services, i) => {
                            return <li key={i}>{`${services.province_name} (${services.city_name})`}</li>
                        })}
                    </ul>
                </Col>
                <Col sm="12" md="12" lg="2" className='section'>
                    <h4>Tarifa Servicio</h4>
                    <hr className='separador mb-3'/>
                    <label className='campos'>Precio:</label>
                    <p>{dataUser?.medic_price} €</p>
                </Col>
            </Row>
            <Row className='ms-2 me-2 my-3 mb-3'>
                <Col sm="12" md="12" className='section'>
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
                            </tr>
                        </thead>
                        <tbody style={{cursor: 'pointer'}} >
                            {dataTitles?.map((title) => {
                            return  (
                                <tr key={title.document}>
                                    <td>{title?.text}</td>
                                    <td>{title?.university}</td>
                                    <td>{title?.start_date === "" || title?.start_date === "null" || title?.start_date === null ? "Sin Fecha" : title?.start_date}</td>
                                    <td>{title?.end_date === "" ||  title?.end_date === "null" || title?.end_date === null ? "Sin Fecha" : title?.end_date}</td>
                                    <td><button onClick={()=>window.open(`/assets/docs/titles/${title.document}`)}><FilePresentRoundedIcon/></button></td>
                                </tr>
                            )
                            })}
                        </tbody>
                    </Table>                    
                </Col>
            </Row>
        </Container>
    </div>
  )
}
