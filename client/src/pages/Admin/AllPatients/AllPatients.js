import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { useNavigate } from "react-router";
import "./styleAllPatiens.scss";
import { AllPatiensAdmin } from "../../../components/Tables/AllPatientsAdmin/AllPatiensAdmin";

export const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const { resetPage, setResetPage } = useContext(NetClinicsContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/admin/getAllPatients").then((res) => {
      setPatients(res.data);
    });
  }, [resetPage]);

  const handleEdit = (id, is_deleted) => {
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

  return (
    <div>
      {patients.length !== 0 ? (
        <AllPatiensAdmin
          patients={patients}
          navitage={navigate}
          handleEdit={handleEdit}
        />
      ) : (
        <h1 className="mt-5 text-center">
          Actualmente no hay pacientes registrados
        </h1>
      )}
    </div>
  );
};
