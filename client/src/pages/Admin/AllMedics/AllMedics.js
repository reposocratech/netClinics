import React, { useContext, useEffect, useState } from "react";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { useNavigate } from "react-router";
import { AllMedicsAdmin } from "../../../components/Tables/AllMedicsAdmin/AllMedicsAdmin";
import { Button, Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./styleAllMedics.scss";

export const AllMedics = () => {
  //Traigo del Contex el resetPage para que actualice la busqueda cuando
  //se requiera
  const { resetPage, setResetPage } = useContext(NetClinicsContext);
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/admin/getAllMedics").then((res) => {
      setResults(res.data);
    });
  }, [resetPage]);

  //Función para borrado lógico de un médico
  const deleted = (id, is_deleted) => {
    //Si el médico no está is_deleted, lo pasa a is_deleted
    let url = `http://localhost:4000/user/deleteUser/${id}`;
    //Si el médico está is_deleted lo vuelve a habilitar
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

  //Función para habilitar o deshabilitar un médico
  const enable = (id, is_enable, medic) => {
    //Si el médico no está habilitado para habilitarlo
    let url = `http://localhost:4000/admin/enableMedic/${id}`;
    //Si el médico está habilitado y hay que deshabilitarlo
    if (is_enable === 1) {
      url = `http://localhost:4000/admin/disableMedic/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        enableMedicEmail(medic);
        setResetPage(!resetPage);
      })
      .catch((Err) => console.log(Err));
  };

   //Función para mandar mail cuando se habilita/deshabilita el médico
   const enableMedicEmail = (medic) => {
    axios
      .post("http://localhost:4000/admin/enableMedicEmail", medic)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //Constante creada para guardar los diferentes resultados del filtrado de datos
  const [searchComplete, setSearchComplete] = useState({
    searchName: "",
    searchlastName: "",
    searchProvince: "",
    searchCity: "",
  });

  //Función para el filtrado
  const handlerSearch = (e) => {
    const { name, value } = e.target;
    setSearchComplete({ ...searchComplete, [name]: value });
  };

  //Función para limpiar el filtrado y que vuelva a aparecer todo el resultado
  //inicial
  const cleanSubmit = () => {
    setSearchComplete({
      searchName: "",
      searchlastName: "",
      searchProvince: "",
      searchCity: "",
    });
    setResetPage(!resetPage);
  };

  //Función para realizar el filtrado según los datos introducidos
  const onSubmit = () => {
    //Se realizan las diferentes combinaciones de busqueda que hay
    if (
      searchComplete.searchlastName !== "" &&
      searchComplete.searchProvince === "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity === ""
    ) {
      setResults(
        results.filter((medic) => {
          return medic.lastname
            .toLowerCase()
            .includes(searchComplete.searchlastName.toLowerCase());
        })
      );
    } else if (
      searchComplete.searchlastName !== "" &&
      searchComplete.searchProvince === "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity === ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.lastname
              .toLowerCase()
              .includes(searchComplete.searchlastName.toLowerCase()) &&
            medic.name
              .toLowerCase()
              .includes(searchComplete.searchName.toLocaleLowerCase())
          );
        })
      );
    } else if (
      searchComplete.searchlastName !== "" &&
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity === ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.lastname
              .toLowerCase()
              .includes(searchComplete.searchlastName.toLowerCase()) &&
            medic.name
              .toLowerCase()
              .includes(searchComplete.searchName.toLocaleLowerCase()) &&
            medic.province_name
              .toLocaleLowerCase()
              .includes(searchComplete.searchProvince.toLocaleLowerCase())
          );
        })
      );
    } else if (
      searchComplete.searchlastName !== "" &&
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity !== ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.lastname
              .toLowerCase()
              .includes(searchComplete.searchlastName.toLowerCase()) &&
            medic.name
              .toLowerCase()
              .includes(searchComplete.searchName.toLocaleLowerCase()) &&
            medic.province_name
              .toLocaleLowerCase()
              .includes(searchComplete.searchProvince.toLocaleLowerCase()) &&
            medic.city_name
              .toLocaleLowerCase()
              .includes(searchComplete.searchCity.toLocaleLowerCase())
          );
        })
      );
    } else if (
      searchComplete.searchlastName !== "" &&
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity !== ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.lastname
              .toLowerCase()
              .includes(searchComplete.searchlastName.toLowerCase()) &&
            medic.name
              .toLowerCase()
              .includes(searchComplete.searchName.toLocaleLowerCase()) &&
            medic.city_name
              .toLocaleLowerCase()
              .includes(searchComplete.searchCity.toLocaleLowerCase())
          );
        })
      );
    } else if (
      searchComplete.searchlastName === "" &&
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity !== ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.name
              .toLowerCase()
              .includes(searchComplete.searchName.toLocaleLowerCase()) &&
            medic.province_name
              .toLocaleLowerCase()
              .includes(searchComplete.searchProvince.toLocaleLowerCase()) &&
            medic.city_name
              .toLocaleLowerCase()
              .includes(searchComplete.searchCity.toLocaleLowerCase())
          );
        })
      );
    } else if (
      searchComplete.searchlastName === "" &&
      searchComplete.searchProvince === "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity !== ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.name
              .toLowerCase()
              .includes(searchComplete.searchName.toLocaleLowerCase()) &&
            medic.city_name
              .toLocaleLowerCase()
              .includes(searchComplete.searchCity.toLocaleLowerCase())
          );
        })
      );
    } else if (
      searchComplete.searchlastName === "" &&
      searchComplete.searchProvince === "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity !== ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.name
              .toLowerCase()
              .includes(searchComplete.searchName.toLocaleLowerCase()) &&
            medic.city_name
              .toLocaleLowerCase()
              .includes(searchComplete.searchCity.toLocaleLowerCase())
          );
        })
      );
    } else if (
      searchComplete.searchlastName === "" &&
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity === ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.name
              .toLowerCase()
              .includes(searchComplete.searchName.toLocaleLowerCase()) &&
            medic.province_name
              .toLocaleLowerCase()
              .includes(searchComplete.searchProvince.toLocaleLowerCase())
          );
        })
      );
    } else if (
      searchComplete.searchlastName === "" &&
      searchComplete.searchProvince === "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity === ""
    ) {
      setResults(
        results.filter((medic) => {
          return medic.name
            .toLowerCase()
            .includes(searchComplete.searchName.toLowerCase());
        })
      );
    } else if (
      searchComplete.searchlastName === "" &&
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity === ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.province_name
              .toLowerCase()
              .includes(searchComplete.searchProvince.toLowerCase()) &&
            medic.name
              .toLowerCase()
              .includes(searchComplete.searchName.toLowerCase())
          );
        })
      );
    } else if (
      searchComplete.searchlastName === "" &&
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity !== ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.province_name
              .toLowerCase()
              .includes(searchComplete.searchProvince.toLowerCase()) &&
            medic.city_name
              .toLocaleLowerCase()
              .includes(searchComplete.searchCity.toLocaleLowerCase())
          );
        })
      );
    } else if (
      searchComplete.searchlastName !== "" &&
      searchComplete.searchProvince !== "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity === ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.province_name
              .toLowerCase()
              .includes(searchComplete.searchProvince.toLowerCase()) &&
            medic.lastname
              .toLowerCase()
              .includes(searchComplete.searchlastName.toLowerCase())
          );
        })
      );
    } else if (
      searchComplete.searchlastName === "" &&
      searchComplete.searchProvince === "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity !== ""
    ) {
      setResults(
        results.filter((medic) => {
          return medic.city_name
            .toLowerCase()
            .includes(searchComplete.searchCity.toLowerCase());
        })
      );
    } else if (
      searchComplete.searchlastName !== "" &&
      searchComplete.searchProvince === "" &&
      searchComplete.searchName === "" &&
      searchComplete.searchCity !== ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.city_name
              .toLowerCase()
              .includes(searchComplete.searchCity.toLowerCase()) &&
            medic.lastname
              .toLowerCase()
              .includes(searchComplete.searchlastName.toLowerCase())
          );
        })
      );
    } else if (
      searchComplete.searchlastName !== "" &&
      searchComplete.searchProvince === "" &&
      searchComplete.searchName !== "" &&
      searchComplete.searchCity !== ""
    ) {
      setResults(
        results.filter((medic) => {
          return (
            medic.city_name
              .toLowerCase()
              .includes(searchComplete.searchCity.toLowerCase()) &&
            medic.lastname
              .toLowerCase()
              .includes(searchComplete.searchlastName.toLowerCase()) &&
            medic.name
              .toLowerCase()
              .includes(searchComplete.searchName.toLowerCase())
          );
        })
      );
    } else {
      setResults(results);
    }
  };

  return (
    <div className="bgAllMedics d-flex justify-content-center">
      {/*Si results trae datos se muestra la tabla con todos los médicos que
      se ajusten a la busqueda, si no, aparece un mensaje */}
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
          <Row className="msg d-flex justify-content-center p-3 mt-5">
            <Col>
              <div className="text-center">
                <h1 className="mb-3">
                  Actualmente no hay registrado ningún médico
                </h1>
                {/*Botón para limpiar la busqueda y volver a la pantalla
                de busqueda anterior */}
                <Button className="defineButton" onClick={cleanSubmit}>
                  Volver
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};
