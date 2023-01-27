import React, { useContext, useEffect, useState } from "react";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { useNavigate } from "react-router";
import { AllMedicsAdmin } from "../../../components/Tables/AllMedicsAdmin/AllMedicsAdmin";
import { Button, Container } from "react-bootstrap";
import { Row, Col } from 'react-bootstrap'
import axios from "axios";
import "./styleAllMedics.scss";

export const AllMedics = () => {
  const { resetPage, setResetPage } = useContext(NetClinicsContext);
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    axios.get("http://localhost:4000/admin/getAllMedics").then((res) => {
      setResults(res.data);
    });
  }, [resetPage]);

  const deleted = (id, is_deleted) => {
    let url = `http://localhost:4000/user/deleteUser/${id}`;

    if (is_deleted === 1) {
      url = `http://localhost:4000/admin/enableUser/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setResetPage(!resetPage);
      })
      .catch((Err) => console.log(Err));
  };

  const vacation = (id, on_vacation) => {
    let url = `http://localhost:4000/admin/onVacation/${id}`;
    if (on_vacation === 1) {
      url = `http://localhost:4000/admin/offVacation/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setResetPage(!resetPage);
      })
      .catch((Err) => console.log(Err));
  };

  const enable = (id, is_enable) => {
    let url = `http://localhost:4000/admin/enableMedic/${id}`;
    if (is_enable === 1) {
      url = `http://localhost:4000/admin/disableMedic/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setResetPage(!resetPage);
      })
      .catch((Err) => console.log(Err));
  };

  const [searchComplete, setSearchComplete] = useState({
    searchName: "",
    searchlastName: "",
    searchProvince: "",
    searchCity: "",
  });

  const [results, setResults] = useState([]);

  const handlerSearch = (e) => {
    const {name, value} = e.target;
    setSearchComplete({...searchComplete, [name]:value});
  };

  const cleanSubmit = () => {
    setSearchComplete({
      searchName: "",
      searchlastName: "",
      searchProvince: "",
      searchCity: "",
    });
    setResetPage(!resetPage)
  };

  const onSubmit = () => {
    if(
      searchComplete.searchlastName !== "" && 
      searchComplete.searchProvince === "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity === ""){
      setResults(results.filter((medic) => {
        return medic.lastname.toLowerCase().includes(searchComplete.searchlastName.toLowerCase());
      }));
    }
    else if(
      searchComplete.searchlastName !== "" && 
      searchComplete.searchProvince === "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity === ""){
      setResults(results.filter((medic) => {
        return medic.lastname.toLowerCase().includes(searchComplete.searchlastName.toLowerCase()) &&
        medic.name.toLowerCase().includes(searchComplete.searchName.toLocaleLowerCase()) ;
      }));
    }
    else if(
      searchComplete.searchlastName !== "" && 
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity === ""){
      setResults(results.filter((medic) => {
        return medic.lastname.toLowerCase().includes(searchComplete.searchlastName.toLowerCase()) &&
        medic.name.toLowerCase().includes(searchComplete.searchName.toLocaleLowerCase()) &&
        medic.province_name.toLocaleLowerCase().includes(searchComplete.searchProvince.toLocaleLowerCase());
      }));
    }
    else if(
      searchComplete.searchlastName !== "" && 
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity !== ""){
      setResults(results.filter((medic) => {
        return medic.lastname.toLowerCase().includes(searchComplete.searchlastName.toLowerCase()) &&
        medic.name.toLowerCase().includes(searchComplete.searchName.toLocaleLowerCase()) &&
        medic.province_name.toLocaleLowerCase().includes(searchComplete.searchProvince.toLocaleLowerCase()) &&
        medic.city_name.toLocaleLowerCase().includes(searchComplete.searchCity.toLocaleLowerCase());
      }));
    }
    
    else if(
      searchComplete.searchlastName !== "" && 
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity !== ""){
      setResults(results.filter((medic) => {
        return medic.lastname.toLowerCase().includes(searchComplete.searchlastName.toLowerCase()) &&
        medic.name.toLowerCase().includes(searchComplete.searchName.toLocaleLowerCase()) &&
        medic.city_name.toLocaleLowerCase().includes(searchComplete.searchCity.toLocaleLowerCase());
      }));
    }
    else if(
      searchComplete.searchlastName === "" && 
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity !== ""){
      setResults(results.filter((medic) => {
        return medic.name.toLowerCase().includes(searchComplete.searchName.toLocaleLowerCase()) &&
        medic.province_name.toLocaleLowerCase().includes(searchComplete.searchProvince.toLocaleLowerCase()) &&
        medic.city_name.toLocaleLowerCase().includes(searchComplete.searchCity.toLocaleLowerCase());
      }));
    }
    else if(
      searchComplete.searchlastName === "" && 
      searchComplete.searchProvince === "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity !== ""){
      setResults(results.filter((medic) => {
        return medic.name.toLowerCase().includes(searchComplete.searchName.toLocaleLowerCase()) &&
        medic.city_name.toLocaleLowerCase().includes(searchComplete.searchCity.toLocaleLowerCase());
      }));
    }
    else if(
      searchComplete.searchlastName === "" && 
      searchComplete.searchProvince === "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity !== ""){
      setResults(results.filter((medic) => {
        return medic.name.toLowerCase().includes(searchComplete.searchName.toLocaleLowerCase()) &&
        medic.city_name.toLocaleLowerCase().includes(searchComplete.searchCity.toLocaleLowerCase());
      }));
    }
    else if(
      searchComplete.searchlastName === "" && 
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity === ""){
      setResults(results.filter((medic) => {
        return medic.name.toLowerCase().includes(searchComplete.searchName.toLocaleLowerCase()) &&
        medic.province_name.toLocaleLowerCase().includes(searchComplete.searchProvince.toLocaleLowerCase()); 
      }));
    }
    else if(
      searchComplete.searchlastName === "" && 
      searchComplete.searchProvince === "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity === ""){
      setResults(results.filter((medic) => {
        return medic.name.toLowerCase().includes(searchComplete.searchName.toLowerCase());
      }));
    } 
    else if(
      searchComplete.searchlastName === "" && 
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity === ""){
      setResults(results.filter((medic) => {
        return medic.province_name.toLowerCase().includes(searchComplete.searchProvince.toLowerCase()) &&
        medic.name.toLowerCase().includes(searchComplete.searchName.toLowerCase());
      }));
    }
    else if(
      searchComplete.searchlastName === "" && 
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity !== ""){
      setResults(results.filter((medic) => {
        return medic.province_name.toLowerCase().includes(searchComplete.searchProvince.toLowerCase()) &&
        medic.city_name.toLocaleLowerCase().includes(searchComplete.searchCity.toLocaleLowerCase());
      }));
    }
    else if(
      searchComplete.searchlastName !== "" && 
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity === ""){
      setResults(results.filter((medic) => {
        return medic.province_name.toLowerCase().includes(searchComplete.searchProvince.toLowerCase()) &&
        medic.lastname.toLowerCase().includes(searchComplete.searchlastName.toLowerCase());
      }));
    }
    else if(
      searchComplete.searchlastName === "" && 
      searchComplete.searchProvince === "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity !== ""){
      setResults(results.filter((medic) => {
        return medic.city_name.toLowerCase().includes(searchComplete.searchCity.toLowerCase());
      }));
    }
    else if(
      searchComplete.searchlastName !== "" && 
      searchComplete.searchProvince === "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity !== ""){
      setResults(results.filter((medic) => {
        return medic.city_name.toLowerCase().includes(searchComplete.searchCity.toLowerCase()) &&
        medic.lastname.toLowerCase().includes(searchComplete.searchlastName.toLowerCase());
      }));
    }
    else if(
      searchComplete.searchlastName !== "" && 
      searchComplete.searchProvince === "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity !== ""){
      setResults(results.filter((medic) => {
        return medic.city_name.toLowerCase().includes(searchComplete.searchCity.toLowerCase()) &&
        medic.lastname.toLowerCase().includes(searchComplete.searchlastName.toLowerCase()) &&
        medic.name.toLowerCase().includes(searchComplete.searchName.toLowerCase());
      }));
    }
    else{
      setResults(results);
    }

  }
console.log("esto es results", results);

  return (
    <div className="bgAllMedics d-flex justify-content-center">
      <Container>
        {results?.length !== 0 ? (
          <AllMedicsAdmin
            navigate={navigate}
            enable={enable}
            deleted={deleted}
            searchComplete={searchComplete}
            results={results}
            handlerSearch={handlerSearch}
            cleanSubmit={cleanSubmit}
            onSubmit={onSubmit}
          />
        ) : (
          <Row className='msg d-flex justify-content-center p-3 mt-5'>
            <Col>
              <div className="text-center">
                <h1 className="mb-3">
                Actualmente no hay registrado ningún médico
                </h1> 
                <Button className="defineButton" onClick={cleanSubmit}>Volver</Button>
              </div>
            </Col>
          </Row>
         
        )}
      </Container>
    </div>
  );
};
