import React, {createContext, useEffect, useState} from 'react';
import { getLocalStorageNetClinics } from '../Utils/localStorage/localStorageNetClinics';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const NetClinicsContext = createContext();

export const NetClinicsProvider = (props) => {

    const [user, setUser] = useState({});
    const token = getLocalStorageNetClinics();
    const [resetPage, setResetPage] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
      //pedir id al localStorage y realizar petición a la bbddd
      if (token) {
        const { user_id } = jwtDecode(token).user;
        setIsLogged(true);
        axios
          .get(`http://localhost:4000/user/oneUser/${user_id}`)
          .then((res) => {
            setUser(res.data[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, [isLogged, resetPage, token]);

  return (
   <div>
        <NetClinicsContext.Provider 
            value={{user, setUser, token, resetPage, setResetPage, isLogged, setIsLogged}}>
            {props.children}
        </NetClinicsContext.Provider>
   </div>
  )
}


