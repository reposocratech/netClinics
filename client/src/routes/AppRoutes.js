import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from '../pages/Auth/Login/Login';
import { Error } from '../pages/Error/Error';
import { Home } from '../pages/Home/Home';
import { RegisterMedic } from '../pages/Register/RegisterMedic/RegisterMedic';
import { RegisterPatient } from '../pages/Register/RegisterPatient';

export const AppRoutes = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route
                  path='*'
                  element={<Error/>}
                />

                <Route
                  path='/'
                  element={<Login/>}
                />

                <Route
                  path='/registerPatient'
                  element={<RegisterPatient/>}
                />

                <Route
                  path='/registerMedic'
                  element={<RegisterMedic/>}
                />
            </Routes>
        </BrowserRouter>
    </div>
  )
}
