import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { SearchAppointment } from '../../../components/Appointment/SearchAppointment';
import { FormSearchMedic } from '../../../components/Forms/FormSearchMedic/FormSearchMedic';
import './Searcher.scss';


export const Searcher = () => {
  const [listProvinces, setListProvinces] = useState([]);
  const [listCities, setListCities] = useState([]);
  const [listSpecialities, setListSpecialities] = useState([]);

  const [search, setSearch] = useState({
    province_id: null,
    city_id: null,
    speciality_id: null,
    name: null,
  });

  const [medicsSearched, setMedicsSearched] = useState([])    
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState("");
  
  
    const handleChange = (e) => {
      setMessageError("");
      const { name, value } = e.target;
      setSearch({ ...search, [name]: value });
    };
    
    const onSubmit = () => {
      
      if(search.city_id !== null && search.city_id !== "Indique una ciudad" && search.province_id !== null && search.province_id !== "Indique una provincia" && search.speciality_id !== null && search.speciality_id !== "Indique una especialidad"){
        axios
          .post(
            `http://localhost:4000/appointment/getInfoAvailableMedic`,search
          )
          .then((res) => {
            if(res.data.length === 0){
              setMessageError("No se ha encontrado ningún resultado")
              setMedicsSearched(res.data)
            }else{
              setMedicsSearched(res.data)
            }
          })
          .catch((err) => console.log(err));
      }
      else{
        if(search.city_id === null || search.city_id === "Indique una ciudad" && search.province_id === null || search.province_id === "Indique una provincia"){
          setMessageError("Debes introducir Provincia y Ciudad");
        }
        else if(search.speciality_id === null || search.speciality_id === "Indique una especialidad"){
          setMessageError("Debes introducir una especialidad");
        }
      }
    };


    useEffect(() => {
        axios
            .get(`http://localhost:4000/place/getAllProvince`)
            .then((res) => {
                setListProvinces(res.data)
            })
            .catch((error) => {
            console.log(error);
            });
    }, []);


    useEffect(() => {
      axios
        .get(`http://localhost:4000/speciality/getAllSpecialities`)
        .then((res) => {
            setListSpecialities(res.data)
        })
        .catch((error) => {
        console.log(error);
        });
    }, [])
      

    const getCity = (selectedProvince) => {
        
        if(selectedProvince){
            axios
            .get(`http://localhost:4000/place/getAllCity/${selectedProvince}`)
            .then((res) => {
              setMessageError("");
              setListCities(res.data);
              setSearch({ ...search, province_id: selectedProvince })
            })
            .catch((error) => {
              console.log(error);
            })
          }
    };

    
  return (
    <div>
      {medicsSearched.length === 0 ? 
        <FormSearchMedic
          handleChange={handleChange}               
          onSubmit={onSubmit}
          navigate={navigate}
          listProvinces={listProvinces}               
          listCities={listCities}                
          getCity={getCity}
          listSpecialities={listSpecialities}
          messageError={messageError}
        />:
        <SearchAppointment
          setSearch={setSearch}
          medicsSearched={medicsSearched}
          setMedicsSearched={setMedicsSearched}
        />
      }
    </div>
  )
}
