import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useContext, useState } from 'react'
import { FormLogin } from '../../../components/Forms/FormLogin/FormLogin'
import { NetClinicsContext } from '../../../context/NetClinicsProvider'
import { saveLocalStorageNetClinics } from '../../../Utils/localStorage/localStorageNetClinics';
import {useNavigate} from 'react-router-dom'

const initialValue = {
    email: '',
    password: ''
};

export const Login = () => {

    const [login, setLogin] = useState(initialValue);
    const [errorMessage, setErrorMessage] = useState("");

    const {setIsLogged, isLogged, user, setUser} = useContext(NetClinicsContext)

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLogin({...login, [name]: value});
    }
    
    const onSubmit = () => {

        if(!login.email || !login.password){
            setErrorMessage("Algunos campos están vacíos");
        }
        else{
            axios
            .post("http://localhost:4000/user/login", login)
            .then((res) => {
                setErrorMessage("");
                const token = res.data.token;
                saveLocalStorageNetClinics(token);
                const {type} = jwtDecode(token).user;
                setIsLogged(true);
    
                /*
                type === 0 ?
                navigate('/allusers', {replace:true}):
                type === 1 ?
                navigate('/admin', {replace:true}):
                navigate('/', {replace:true})
                */

            })
            .catch((error) => {
                setErrorMessage("");
                console.log(error)
            })
        }
      
    }

    console.log(login);

  return (
    <FormLogin 
        handleChange={handleChange}
        onSubmit={onSubmit}
        login={login}
        setLogin={setLogin}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        navigate={navigate}
    />
  )
}
