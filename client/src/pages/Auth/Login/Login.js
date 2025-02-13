import axios from "axios";
import React, { useContext, useState } from "react";
import { FormLogin } from "../../../components/Forms/FormLogin/FormLogin";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import { saveLocalStorageNetClinics } from "../../../Utils/localStorage/localStorageNetClinics";
import { useNavigate } from "react-router-dom";

const initialValue = {
  email: "",
  password: "",
};

export const Login = () => {
  const [login, setLogin] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const { setIsLogged } = useContext(NetClinicsContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const onSubmit = () => {
    const email = login.email.trim();
    const password = login.password.trim();

    if (!email) {
      setErrorEmail("Tienes que introducir email");
    } else if (!password) {
      setErrorEmail("");
      setErrorPassword("Tienes que introducir contraseña");
    } else {
      axios
        .post("http://localhost:4000/user/login", login)
        .then((res) => {
          setErrorEmail("");
          setErrorMessage("");
          setErrorPassword("");
          const token = res.data.token;
          saveLocalStorageNetClinics(token);
          setIsLogged(true);

          navigate("/", { replace: true });
        })
        .catch((error) => {
          setErrorPassword("");
          setErrorMessage(error.response.data);
          console.log(error.response.data);
        });
    }
  };

  return (
    <FormLogin
      handleChange={handleChange}
      onSubmit={onSubmit}
      login={login}
      setLogin={setLogin}
      errorMessage={errorMessage}
      errorEmail={errorEmail}
      errorPassword={errorPassword}
      navigate={navigate}
    />
  );
};
