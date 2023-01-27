import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import "./styleAllMedics.scss";
import { useNavigate } from "react-router";
import { AllMedicsAdmin } from "../../../components/Tables/AllMedicsAdmin/AllMedicsAdmin";
import { Container } from "react-bootstrap";

export const AllMedics = () => {
  const { resetPage, setResetPage } = useContext(NetClinicsContext);
  const [medics, setMedics] = useState([]);
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    axios.get("http://localhost:4000/admin/getAllMedics").then((res) => {
      setMedics(res.data);
      console.log("información de todos los médicos", res.data);
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

  return (
    <div className="bgAllMedics">
      <Container>
        {medics?.length !== 0 ? (
          <AllMedicsAdmin
            medics={medics}
            navigate={navigate}
            enable={enable}
            deleted={deleted}
          />
        ) : (
          <h1 className="mt-5 text-center">
            Actualmente no hay registrado ningún médico
          </h1>
        )}
      </Container>
    </div>
  );
};
