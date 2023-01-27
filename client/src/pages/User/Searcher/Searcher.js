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
  const [search, setSearch] = useState();
  const [medicsSearched, setMedicsSearched] = useState([])    
  const navigate = useNavigate();
  
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSearch({ ...search, [name]: value });
    };
    console.log(search);
    
  const onSubmit = () => {
    
    axios
      .post(
        `http://localhost:4000/appointment/getInfoAvailableMedic`,search
      )
      .then((res) => {
        
          setMedicsSearched(res.data)
        // console.log(res.data);
        
      })
      .catch((err) => console.log(err));
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
          medicsSearched={medicsSearched}
          setMedicsSearched={setMedicsSearched}
        />:
        <SearchAppointment
          medicsSearched={medicsSearched}
          setMedicsSearched={setMedicsSearched}
        />
      }
    </div>
  )
}
