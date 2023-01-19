import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const initialMedicValue = {
    name: '',
    lastname: '',
    address: '',
    phone_number: '',
    dni: '',
    email: '',
    postal_code: '',
    password: '',
    province_id: '',
    city_id: '',
    medic_membership_number: '',
    document: '',
}

export const RegisterMedic = ({showRegisterPatient, setShowRegisterPatient, showRegisterMedic, setShowRegisterMedic}) => {
    const [registerMedic, setRegisterMedic] = useState(initialMedicValue);
    const [documents, setDocuments] = useState();
    const [inputDocument, setInputDocument] = useState();
    const [message1, setMessage1] = useState(false);
    const [message2, setMessage2] = useState(false);
    const [listProvinces, setListProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState();
    const [listCities, setListCities] = useState([]);
    const [selectedCitie, setSelectedCitie] = useState();

    const navigate = useNavigate();

    const showFormPatient = () => {
        setShowRegisterMedic(false);
        setShowRegisterPatient(true);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRegisterMedic({...registerMedic, [name]:value});
    }

    const handleFiles = (e) => {
        setInputDocument(e.target.files);
    }

    const onSubmit = (event) => {
        const newFormData = new FormData();

        if(!registerMedic.email || !registerMedic.password){
            setMessage1(true)
            setMessage2(false)
        }
        else{
            if(inputDocument){
                for(const elem of inputDocument){
                    newFormData.append('file', elem)
                }
            }
            
            axios
                .post("http://localhost:4000/medic/createMedic", registerMedic)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    setMessage1(false)
                    setMessage2(true)
                    console.log(error);
                })
        }
    }

    useEffect(() => {
        axios
          .get("http://localhost:4000/place/getAllProvince/")
          .then((res) => {
            setListProvinces(res.data);
          })
          .catch((error) =>{
            console.log(error);
          })
      }, []);

    const getCity = (selectedProvince) => {
        console.log(selectedProvince);
        if(selectedProvince){
           axios
            .get(`http://localhost:4000/place/getAllCity/${selectedProvince}`)
            .then((res) => {
              setListCities(res.data);
              setRegisterMedic({...registerMedic, province_id : selectedProvince})
            })
            .catch((error) => {
              console.log(error);
            })
          }
      };

    const handleCities = (e) => {
        // setSelectedProvince(e.target.value);
        setRegisterMedic({...registerMedic, city_id : e.target.value});
    }

  return (
    <div className='bgColor d-flex flex-column'>
        <button className='borderButton' onClick={showFormPatient}>
        ¿Eres Paciente?. Regístrate aquí.
        </button>
      <div className='whiteBox d-flex flex-column justify-content-center'>
        <h2> Registro Fisio</h2>
        
          <input
          className='my-3'
          placeholder='Escribe tu Nombre'
          name='name'
          type='text'
          required
          value={registerMedic.name}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Escribe tu Apellido'
          name='lastname'
          type='text'
          required
          value={registerMedic.lastname}
          onChange={handleChange}
          />

        <input
          className='mb-3'
          placeholder='Introduce tu D.N.I'
          name='dni'
          type='text'
          required
          value={registerMedic.dni}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu Nº de Teléfono'
          name='phone_number'
          type='text'
          required
          value={registerMedic.phone_number}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Escribe tu Dirección'
          name='address'
          type='text'
          value={registerMedic.address}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu Código Postal'
          name='postal_code'
          type='text'
          value={registerMedic.postal_code}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu Nº de Colegiado'
          name='medic_membership_number'
          type='text'
          required
          value={registerMedic.medic_membership_number}
          onChange={handleChange}
          />

          <select className='mb-3' name='province'
          onChange={(e) => getCity(e.target.value)}>
            <option>Elige Provincia</option>
            {listProvinces?.map((province) => {
              return (
                  <option key={province.province_id} value={province.province_id}>{province.province_name}</option>    
              )
            })}
          </select>

          <select className='mb-3' name='cities'
          onChange={handleCities}>
            <option>Elige Ciudad</option>
            {listCities?.map((city) => {
              return (
                  <option key={city.city_id} value={city.city_id}>{city.city_name}</option>    
              )
            })}
          </select>

          <input
          className='mb-3'
          placeholder='Escribe tu Email'
          name='email'
          type='email'
          required
          autoComplete='off'
          value={registerMedic.email}
          onChange={handleChange}
          />

          <input
          className='mb-3'
          placeholder='Introduce tu Contraseña'
          name='password'
          type='password'
          required
          value={registerMedic.password}
          onChange={handleChange}
          />

          <label>Adjunta tu Título Profesional y Documento de Número de Colegiado</label>
          <input type='file' multiple onChange={handleFiles}/>

          <div className='mb-2'>
            {message1 && <p>Introduce todos los datos</p>}
            {message2 && <p>Ya existe una cuenta con este email</p>}
          </div>

          <button
            className='defineButton'
            onClick={onSubmit}
          >Regístrate</button>

          <hr/>

          <button
            className='mb-3 defineButton'
            onClick={() => navigate('/loginPatient')}
          >Login</button>

      </div>
    </div>
  )
}
