import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export const Searcher = () => {
    const [listProvinces, setListProvinces] = useState([]);
    const [listCities, setListCities] = useState([]);
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
    
  return (
    <Container>
        <Row>
            <Col>
            </Col>
        </Row>
    </Container>
  )
}
