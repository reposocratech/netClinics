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
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const {setIsLogged, isLogged, user, setUser} = useContext(NetClinicsContext)

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLogin({...login, [name]: value});
    }
    
    const onSubmit = () => {

        const email = login.email.trim();
        const password = login.password.trim();

        if(!email){
            setErrorEmail("Tienes que introducir email");
        }
        else if(!password){
            setErrorEmail("");
            setErrorPassword("Tienes que introducir contraseña")
        }
        else{
            axios
            .post("http://localhost:4000/user/login", login)
            .then((res) => {
                setErrorEmail("");
                setErrorMessage("");
                setErrorPassword("");
                const token = res.data.token;
                console.log(token);
                saveLocalStorageNetClinics(token);
                const {type} = jwtDecode(token).user;
                setIsLogged(true);
    
                /*
                :type === 1 ?
                navigate('/admin', {replace:true}):
                navigate('/', {replace:true})
                */
                
                type === 2 && navigate('/homeMedic', {replace:true});

                // type === 3 && navigate('/homePatient', {replace:true});
                

            })
            .catch((error) => {
                setErrorPassword("");
                setErrorMessage("Las credenciales no son válidas");
                console.log(error)
            })
        }
      
    }

  return (
    <FormLogin 
        handleChange={handleChange}
        onSubmit={onSubmit}
        login={login}
        setLogin={setLogin}
        errorMessage={errorMessage}
        // setErrorMessage={setErrorMessage}
        errorEmail={errorEmail}
        errorPassword={errorPassword}
        navigate={navigate}
    />
  )
}
