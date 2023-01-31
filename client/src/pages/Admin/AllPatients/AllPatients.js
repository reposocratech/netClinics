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

    //Realizo una busqueda que me trae todos los pacientes
    useEffect(() => {
      axios.get("http://localhost:4000/admin/getAllPatients").then((res) => {
        setPatients(res.data);
      });
    }, [resetPage]);

    //Función para borrado lógico del paciente
    const handleEdit = (id, is_deleted) => {
    //Si el paciente está activo realiza el borrado lógico
      let url = `http://localhost:4000/user/deleteUser/${id}`;

      if (is_deleted === 1) {
        //Si al paciente se le ha realizado borrado lógico lo vuelve a activar
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
      {/*Si patients trae datos se muestra la tabla con todos los pacientes, 
      si no trae datos aparece mensaje */}
      {patients?.length !== 0 && 
        <AllPatiensAdmin
          patients={patients}
          navigate={navigate}
          handleEdit={handleEdit}
        />
      }
      {!patients?.length &&
        <h1 className="mt-5 text-center">
          Actualmente no hay pacientes registrados
        </h1>
      }
    </div>
  );
};
