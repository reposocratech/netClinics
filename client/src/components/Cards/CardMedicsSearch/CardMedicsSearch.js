import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

export const CardMedicsSearch = ({medicsSearched,setMedicsSearched}) => {
    const [listSpecialities, setListSpecialities] = useState([])
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
      const findSpeciality = (id_speciality) => {
         return listSpecialities?.find((el)=> {
            if(el.speciality_id === id_speciality){
                return el.speciality_name
            }
        })?.speciality_name;
      }
    
  return (
    <div>
        <Button onClick={()=>setMedicsSearched([])}>Cancelar</Button>
        {medicsSearched?.map((medic,i) => {
            return(
                <Card key={i} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={`/assets/images/user/${medic?.avatar}`} />
                  <Card.Body>
                    <Card.Title>Nombre:</Card.Title>
                    <Card.Text>{medic?.name}</Card.Text>
                    <Card.Title>Número de colegiado:</Card.Title>
                    <Card.Text>{medic?.medic_membership_number}</Card.Text>
                    <Card.Title>Especialidad:</Card.Title>
                    <Card.Text>{findSpeciality(medic?.speciality_id)}</Card.Text>
                    <Button variant="primary">Disponibilidad</Button>
                  </Card.Body>
                </Card>
    
            )
        })}

    </div>
  )
}
