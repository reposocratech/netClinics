import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormEditUser } from "../../../components/Forms/FormEditUser/FormEditUser";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import "./styleEditUser.scss";

export const EditUser = () => {
  const { user, setUser, setResetPage, resetPage } =
    useContext(NetClinicsContext);
  const [editUser, setEditUser] = useState();
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const [listProvinces, setListProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState();
  const [listCities, setListCities] = useState([]);
  const [selectedCitie, setSelectedCitie] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/place/getAllProvince/")
      .then((res) => {
        setListProvinces(res.data);
        setEditUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleFile = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newFormData = new FormData();

    newFormData.append("file", file);
    newFormData.append("register", JSON.stringify(editUser));
    console.log("lo que hay en el editUser", editUser);
    axios
      .put(
        `http://localhost:4000/patient/editPatient/${user.user_id}`,
        newFormData
      )
      .then((res) => {
        setUser(editUser);
        setResetPage(!resetPage);
        navigate("/myProfile");
      })
      .catch((err) => console.log(err));
  };

  const getCity = (selectedProvince) => {

    if (selectedProvince) {
      axios
        .get(`http://localhost:4000/place/getAllCity/${selectedProvince}`)
        .then((res) => {
          setListCities(res.data);
          setUser({ ...editUser, province_id: selectedProvince });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="bgEditPatientProfile d-flex justify-content-center align-items-center">
      <Container className="whiteBoxEditPatient my-5">
        <Row className="rowEditPatientProfile d-flex align-items-center">
          <FormEditUser
            editUser={editUser}
            handleChange={handleChange}selectedProvince
            handleFile={handleFile}
            onSubmit={onSubmit}
            navigate={navigate}
            listProvinces={listProvinces}
            setSelectedProvince={setSelectedProvince}
            listCities={listCities}
            setListCities={setListCities}
            setSelectedCitie={setSelectedCitie}
            getCity={getCity}
          />
        </Row>
      </Container>
    </div>
  );
};
