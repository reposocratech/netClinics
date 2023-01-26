import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { emailValidator } from '../../../Utils/checkEmail/checkEmail';
import { FormRegisterMedic } from '../../../components/Forms/FormRegisterMedic/FormRegisterMedic';

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
    speciality_id: '',
}

export const RegisterMedic = () => {
    const [registerMedic, setRegisterMedic] = useState(initialMedicValue);
    const [documents, setDocuments] = useState([]);
    const [message1, setMessage1] = useState(false);
    const [message2, setMessage2] = useState(false);
    const [listProvinces, setListProvinces] = useState([]);
    const [listCities, setListCities] = useState([]);
    const [listSpecialities, setListSpecialities] = useState([]);


    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRegisterMedic({...registerMedic, [name]:value});
    }

    const handleFiles = (e) => {
        setDocuments(e.target.files);
        console.log(documents);
    }

    const onSubmit = (event) => {
      if(!emailValidator(registerMedic.email) || !registerMedic.password){
          setMessage1(true)
          setMessage2(false)
      }
      else{
          const newFormData = new FormData();
          newFormData.append('regMedic', JSON.stringify(registerMedic));

          if(documents){
            for(const doc of documents){
                newFormData.append('file', doc)
            }
          }
          
          axios
              .post("http://localhost:4000/medic/createMedic", newFormData)
              .then((res) => {
                  console.log(res);
                  navigate('/');
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
        
        axios
          .get("http://localhost:4000/speciality/getAllSpecialities")
          .then((res) => {
            setListSpecialities(res.data);
          })
          .catch((error) => {
            console.log(error);
          });


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
      setRegisterMedic({...registerMedic, city_id : e.target.value});
    }

  return (
    <FormRegisterMedic
        registerMedic={registerMedic}
        message1={message1}
        message2={message2}
        listProvinces={listProvinces}
        listCities={listCities}
        listSpecialities={listSpecialities}
        navigate={navigate}
        handleChange={handleChange}
        handleFiles={handleFiles}
        onSubmit={onSubmit}
        getCity={getCity}
        handleCities={handleCities}
    />
  )
}
