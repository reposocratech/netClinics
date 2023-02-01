import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormEditUser } from "../../../components/Forms/FormEditUser/FormEditUser";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import "./styleEditAdmin.scss";

export const EditAdmin = () => {
  const { user, setUser, setResetPage, resetPage } =
    useContext(NetClinicsContext);
  const [editUser, setEditUser] = useState();

  const navigate = useNavigate();

  const [listProvinces, setListProvinces] = useState([]);
  const [listCities, setListCities] = useState([]);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();

  //Traigo la información del nombre de provincia y ciudad
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

    axios
      .get(`http://localhost:4000/place/getAllCity/${user?.province_id}`)
      .then((res) => {
        setListCities(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  //Función para guardar los cambios realizados
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  useEffect(() => {
    setResetPage(!resetPage);
  }, []);

  //Función para guardar los datos editados
  const onSubmit = (e) => {
    e.preventDefault();

    const newFormData = new FormData();

    newFormData.append("file", image);
    newFormData.append("register", JSON.stringify(editUser));
  
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

  //Función para rescatar el nombre de la ciudad en base a la provincia
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

  //useEffect para que esté pendiente la imagen seleccionada
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  //Conforme se cambie la imagen setea el archivo seleccionado y la imagen
  //que se mandará a base de datos
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div className="bgEditPatientProfile d-flex justify-content-center align-items-center">
      <Container className="whiteBoxEditPatient my-5">
        <Row className="rowEditPatientProfile d-flex align-items-center">
          <FormEditUser
            editUser={editUser}
            handleChange={handleChange}
            onSubmit={onSubmit}
            navigate={navigate}
            listProvinces={listProvinces}
            listCities={listCities}
            getCity={getCity}
            onSelectFile={onSelectFile}
            preview={preview}
          />
        </Row>
      </Container>
    </div>
  );
};
