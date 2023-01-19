import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Error } from '../pages/Error/Error';
import { Home } from '../pages/Home/Home';
import { PatientRegister } from '../pages/Patient/Register/PatientRegister'

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
                  element={<Home/>}
                />

                <Route
                  path='/registerPatient'
                  element={<PatientRegister/>}
                />
            </Routes>
        </BrowserRouter>
    </div>
  )
}
