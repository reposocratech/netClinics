import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { NavBarNetClinics } from '../components/NavBar/NavBarNetClinics';
import { NetClinicsContext } from '../context/NetClinicsProvider';
import { Login } from '../pages/Auth/Login/Login';
import { Error } from '../pages/Error/Error';
import { HomeMedic } from '../pages/Home/HomeMedic';
import { HomePatient } from '../pages/Home/HomePatient';
import { AvailabilityMedic } from '../pages/Medic/Availability/AvailabilityMedic';
import { RegisterMedic } from '../pages/Register/RegisterMedic/RegisterMedic';
import { RegisterPatient } from '../pages/Register/RegisterPatient';

export const AppRoutes = () => {

  const {token, user} = useContext(NetClinicsContext);

  return (
    <div>
        <BrowserRouter>
          {/* Navbar Netclinics */}
            {token &&
              <NavBarNetClinics/>
            }
            <Routes>

                <Route
                  path='*'
                  element={<Error/>}
                />

                {!token &&
                  <Route
                    path='/'
                    element={<Login/>}
                  />
                }

                  <Route
                    path='/registerPatient'
                    element={<RegisterPatient/>}
                  />

                  <Route
                    path='/registerMedic'
                    element={<RegisterMedic/>}
                  />

                {(token && user?.type === 2) &&
                  <Route
                    path='/homeMedic'
                    element={<HomeMedic/>}
                  />
                }
                
                {(token && user?.type === 3) &&
                  <Route
                    path='/homePatient'
                    element={<HomePatient/>}
                  />
                }
                
                  <Route
                    path='/availability/:user_id'
                    element={<AvailabilityMedic/>}
                  />

                {token &&
                  <Route
                    path='/myProfile'
                    element={""}
                  />
                }


            </Routes>
        </BrowserRouter>
    </div>
  )
}
