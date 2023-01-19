import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';

const initialPatientValue = {
  name: '',
  lastname: '',
  phone_number: '',
  address: '',
  email: '',
  password: '',
  dni: '',
  province_id: '',
  city_id: '',
  postal_code: '',
}

export const PatientRegister = () => {
  const [registerPatient, setRegisterPatient] = useState(initialPatientValue);
  const [message1, setMessage1] = useState(false);
  const [message2, setMessage2] = useState(false);

  const [listProvinces, setListProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState();
  const [listCities, setListCities] = useState([]);
  const [selectedCitie, setSelectedCitie] = useState();

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
       })
       .catch((error) => {
         console.log(error);
       })
      }
  };
  

  const navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setRegisterPatient({...registerPatient, [name]:value});
  }

  const onSubmit = (event) => {
    if(!registerPatient.email || !registerPatient.password){
      setMessage1(true)
      setMessage2(false)
    }
    else{
      axios
        .post("http://localhost:4000/patient/createPatient", registerPatient)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          setMessage1(false);
          setMessage2(true);
          console.log(error);
        })
    }
  }

  const handleCities = (e) => {
    setSelectedProvince(e.target.value);
  }


  //console.log(selectedProvince);
  console.log(listCities);

  return (
    <div className='d-flex flex-column justify-content-center text-center w-25 px-5'>
      <input
      className='my-3'
      placeholder='Escribe tu Nombre'
      name='name'
      type='text'
      required
      value={registerPatient.name}
      onChange={handleChange}
      />

      <input
      className='mb-3'
      placeholder='Escribe tu Apellido'
      name='lastname'
      type='text'
      required
      value={registerPatient.lastname}
      onChange={handleChange}
      />

      <input
      className='mb-3'
      placeholder='Introduce tu D.N.I'
      name='dni'
      type='text'
      required
      value={registerPatient.dni}
      onChange={handleChange}
      />

      <input
      className='mb-3'
      placeholder='Introduce tu Nº de Teléfono'
      name='phone_number'
      type='text'
      required
      value={registerPatient.phone_number}
      onChange={handleChange}
      />

      <input
      className='mb-3'
      placeholder='Escribe tu Dirección'
      name='address'
      type='text'
      value={registerPatient.address}
      onChange={handleChange}
      />

      <input
      className='mb-3'
      placeholder='Introduce tu Código Postal'
      name='postal_code'
      type='text'
      value={registerPatient.postal_code}
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
      value={registerPatient.email}
      onChange={handleChange}
      />

      <input
      className='mb-3'
      placeholder='Introduce tu Contraseña'
      name='password'
      type='password'
      required
      value={registerPatient.password}
      onChange={handleChange}
      />

      <div className='mb-2'>
        {message1 && <p>Introduce todos los datos</p>}
        {message2 && <p>Ya existe una cuenta con este email</p>}
      </div>

      <button
        className='mb-2'
        onClick={onSubmit}
      >Registrate</button>

      <hr/>

      <button
        className='mb-3'
        onClick={() => navigate('/loginPatient')}
      >Login</button>
    </div>
  )
}
