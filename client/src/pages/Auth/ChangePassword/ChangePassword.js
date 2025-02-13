import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { FormChangePassword } from "../../../components/Forms/FormChangePassword/FormChangePassword";
import { removeLocalStorage } from "../../../Utils/localStorage/localStorageNetClinics";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";

import "./formChangePassword.scss";

export const ChangePassword = () => {
  const { user, setUser, setIsLogged } = useContext(NetClinicsContext);
  const [editUser, setEditUser] = useState({ password: "", checkPassword: "" });
  const [messageError, setMessageError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMessageError("");
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //checkeo si la nueva contraseña es la misma en ambos campos
    if (editUser.password === editUser.checkPassword) {
      if (editUser.password !== "" && editUser.password.trim("") !== "") {
        axios
          .put(
            `http://localhost:4000/user/changeUserPassword/${user.user_id}`,
            editUser
          )
          .then((res) => {
            //cierro sesion habiendo cambiado contraseña y redirijo a login
            setIsLogged(false);
            setUser({});
            removeLocalStorage();
            navigate("/");
          })
          .catch((err) => console.log(err));
      } else {
        setMessageError("Debes introducir datos");
      }
    } else {
      setMessageError("Las contraseñas introducidas son distintas");
    }
  };

  return (
    <div>
      <FormChangePassword
        editUser={editUser}
        handleChange={handleChange}
        onSubmit={onSubmit}
        navigate={navigate}
        messageError={messageError}
      />
    </div>
  );
};
