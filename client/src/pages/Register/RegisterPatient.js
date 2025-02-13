import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { FormRegisterPatient } from '../../components/Forms/FormRegisterPatient/FormRegisterPatient';
import axios from 'axios';
import { emailValidator } from '../../Utils/checkEmail/checkEmail';


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

export const RegisterPatient = () => {

  const [registerPatient, setRegisterPatient] = useState(initialPatientValue);
  const [message1, setMessage1] = useState(false);
  const [message2, setMessage2] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");

  const [listProvinces, setListProvinces] = useState([]);
  const [listCities, setListCities] = useState([]);

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
    if(selectedProvince){
       axios
        .get(`http://localhost:4000/place/getAllCity/${selectedProvince}`)
        .then((res) => {
          setListCities(res.data);
          setRegisterPatient({...registerPatient, province_id : selectedProvince})
        })
        .catch((error) => {
          console.log(error);
        })
      }
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
      setErrorEmail("");
      setMessage2(false);
      const {name, value} = event.target;
      setRegisterPatient({...registerPatient, [name]:value});
  }

  const onSubmit = () => {
      if(
          !emailValidator(registerPatient.email) 
          || !registerPatient.password.trim("")
          || !registerPatient.name.trim("")
          || !registerPatient.lastname.trim("")
          || !registerPatient.address.trim("")
          || !registerPatient.dni.trim("")
          || !registerPatient.province_id
          || !registerPatient.city_id
          
        ){ 
          setMessage1(true)
          setMessage2(false)
      }
      else{
          axios
          .post("http://localhost:4000/patient/createPatient", registerPatient)
          .then((res) => {
              navigate('/');
          })
          .catch((error) => {
              if(error.response.data.error.code === 'ER_DUP_ENTRY'){
                setErrorEmail("errorMail");
                setMessage2(true);
              }
              else{
                console.log(error);
                setMessage1(false);
               
              }
          })
      }
  }

    const handleCities = (e) => {
        // setSelectedProvince(e.target.value);
        setRegisterPatient({...registerPatient, city_id : e.target.value});
    }


  return (
    <div>
      <FormRegisterPatient
        registerPatient={registerPatient}
        handleChange={handleChange}
        getCity={getCity}
        handleCities={handleCities}
        listCities={listCities}
        listProvinces={listProvinces}
        onSubmit={onSubmit}
        navigate={navigate}
        message1={message1}
        message2={message2}
        errorEmail={errorEmail}
      />
    </div>
  )
}
