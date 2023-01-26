import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { useNavigate } from "react-router";

import "./styleValidations.scss";
import { ValidationAdmins } from "../../../components/Tables/ValidationsAdmin/ValidationAdmins";

export const Validations = () => {
  const { resetPage, setResetPage } = useContext(NetClinicsContext);
  const [medics, setMedics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllMedicsValidation")
      .then((res) => {
        setMedics(res.data);
        console.log("información de todos los médicos", res.data);
      });
  }, [resetPage]);

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
  console.log("esto trae medics", medics);
  return (
    <div>
      {medics.length !== 0 ? (
        <ValidationAdmins medics={medics} navigate={navigate} enable={enable} />
      ) : (
        <h1 className="mt-5 text-center">
          Actualmente no hay validaciones de médicos pendientes
        </h1>
      )}
    </div>
  );
};
