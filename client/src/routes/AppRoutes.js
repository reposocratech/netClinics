import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { NavBarNetClinics } from '../components/NavBar/NavBarNetClinics';
import { NetClinicsContext } from '../context/NetClinicsProvider';
import { Login } from '../pages/Auth/Login/Login';
import { Error } from '../pages/Error/Error';
import { HomeMedic } from '../pages/Home/HomeMedic';
import { HomePatient } from '../pages/Home/HomePatient';
import { AvailabilityMedic } from '../pages/Medic/Availability/AvailabilityMedic';
import { EditMedic } from '../pages/Medic/EditMedic/EditMedic';
import { MedicProfile } from '../pages/Medic/MedicProfile/MedicProfile';
import { RegisterMedic } from '../pages/Register/RegisterMedic/RegisterMedic';
import { RegisterPatient } from '../pages/Register/RegisterPatient';
import { EditUser } from '../pages/User/EditUser/EditUser';
import { Searcher } from '../pages/User/Searcher/Searcher';
import { UserProfile } from '../pages/User/UserProfile/UserProfile';

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
                {/* Si no hay logueo, que se pueda registrar tanto médico como paciente */}
                {!token &&
                  <>

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

                  </>
                }


                {/* Rutas para médicos */}
                {(token && user?.type === 2) &&
                <> 
                  {/* Ruta principal si es médico */}
                  <Route
                    path='/'
                    element={<HomeMedic/>}
                  />
                  {/* Ruta para ver su perfil */}
                  <Route
                    path='/myProfile'
                    element={<MedicProfile/>}
                  />
                  {/* Ruta para Edición de perfil */}
                  <Route
                    path='/editProfile'
                    element={<EditMedic/>}
                  />
                  {/* Ruta para mis citas */}
                  <Route
                    path='/appointments'
                    element={"/appointments"}
                  />
                  {/* Ruta para cita pendiente confirmar */}
                  <Route
                    path='/pendingAppointments'
                    element={"/pendingAppointments"}
                  />
                  {/* Ruta para próximas citas */}
                  <Route
                    path='/followingAppointments'
                    element={"/followingAppointments"}
                  />
                  {/* Ruta para ver y editar su disponibilidad, sólo médico */}
                  <Route
                  path='/availability'
                  element={<AvailabilityMedic/>}
                  />

                </>
                }
                
                
                {/* Rutas Pacientes */}
                {(token && user?.type === 3) &&
                  <>
                    {/* Ruta principal si es paciente */}
                    <Route
                    path='/'
                    element={<HomePatient/>}
                    />
                    {/* Ruta para ver su perfil */}
                    <Route
                    path='/myProfile'
                    element={<UserProfile/>}
                    />
                    {/* Ruta para Edición de perfil */}
                    <Route
                    path='/editProfile'
                    element={<EditUser/>}
                    />
                    {/* Ruta para reservar citas */}
                    <Route
                    path='/searcher'
                    element={<Searcher/>}
                    />



                  </>
                }

                {/* Ruta para error */}
                <Route
                  path='*'
                  element={<Error/>}
                />

            </Routes>
        </BrowserRouter>
    </div>
  )
}
