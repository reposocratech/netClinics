import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { NavBarNetClinics } from '../components/NavBar/NavBarNetClinics';
import { NetClinicsContext } from '../context/NetClinicsProvider';
import { AdminProfile } from '../pages/Admin/AdminProfile/AdminProfile';
import { AllMedics } from '../pages/Admin/AllMedics/AllMedics';
import { AllPatients } from '../pages/Admin/AllPatients/AllPatients';
import { EditAdmin } from '../pages/Admin/EditAdmin/EditAdmin';
import { AdminMedicProfile } from '../pages/Admin/MedicProfile/AdminMedicProfile';
import { AdminPatientProfile } from '../pages/Admin/PatientProfile/AdminPatientProfile';
import { Validations } from '../pages/Admin/Validations/Validations';
import { ChangePassword } from '../pages/Auth/ChangePassword/ChangePassword';
import { Login } from '../pages/Auth/Login/Login';
import { Error } from '../pages/Error/Error';
import { HomeAdmin } from '../pages/Home/HomeAdmin';
import { HomeMedic } from '../pages/Home/HomeMedic';
import { HomePatient } from '../pages/Home/HomePatient';
import { AvailabilityMedic } from '../pages/Medic/Availability/AvailabilityMedic';
import { EditMedic } from '../pages/Medic/EditMedic/EditMedic';
import { MedicAppointmentsHistory } from '../pages/Medic/MedicAppointments/MedicAppointmentsHistory';
import { MedicFollowingAppointments } from '../pages/Medic/MedicAppointments/MedicFollowingAppointments';
import { MedicPendingAppointments } from '../pages/Medic/MedicAppointments/MedicPendingAppointments';
import { MedicProfile } from '../pages/Medic/MedicProfile/MedicProfile';
import { RegisterMedic } from '../pages/Register/RegisterMedic/RegisterMedic';
import { RegisterPatient } from '../pages/Register/RegisterPatient';
import { EditUser } from '../pages/User/EditUser/EditUser';
import { Searcher } from '../pages/User/Searcher/Searcher';
import { UserAppointmentsHistory } from '../pages/User/UserAppointments/UserAppointmentsHistory';
import { UserFollowingAppointments } from '../pages/User/UserAppointments/UserFollowingAppointments';
import { UserPendingAppointments } from '../pages/User/UserAppointments/UserPendingAppointments';
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
                    path='/medicAppointmentsHistory'
                    element={<MedicAppointmentsHistory/>}
                  />
                  {/* Ruta para cita pendiente confirmar */}
                  <Route
                    path='/medicPendingAppointments'
                    element={<MedicPendingAppointments/>}
                  />
                  {/* Ruta para próximas citas */}
                  <Route
                    path='/medicFollowingAppointments'
                    element={<MedicFollowingAppointments/>}
                  />
                  {/* Ruta para ver y editar su disponibilidad, sólo médico */}
                  <Route
                  path='/availability'
                  element={<AvailabilityMedic/>}
                  />
                  {/* Ruta para cambiar la contraseña de su cuenta*/}
                  <Route
                    path='/changePassword'
                    element={<ChangePassword/>}
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
                    {/* Ruta para ver el historial de citas */}
                    <Route
                    path='/userAppointmentsHistory'
                    element={<UserAppointmentsHistory/>}
                    />
                    {/* Ruta para ver las citas pendientes (tanto confirmadas como pendientes de confirmar) */}
                    <Route
                    path='/userPendingAppointments'
                    element={<UserPendingAppointments/>}
                    />
                    {/* Ruta para ver las proximas citas ya confirmadas */}
                    <Route
                    path='/userFollowingAppointments'
                    element={<UserFollowingAppointments/>}
                    />
                    {/* Ruta para cambiar la contraseña de su cuenta*/}
                    <Route
                    path='/changePassword'
                    element={<ChangePassword/>}
                    />


                  </>
                }

                {/* Ruta para error */}
               
                  <Route
                    path='*'
                    element={<Error/>}
                  />

                 {/* Rutas Administrador */}
                 {(token && user?.type === 1) &&
                  <>
                  {/* Ruta principal si es administrador */}
                    <Route
                    path='/'
                    element={<HomeAdmin/>}
                    />
                    {/* Ruta vista de todos los pacientes */}
                    <Route
                    path='/allPatients'
                    element={<AllPatients/>}
                    />
                    {/* Ruta vista de todos los médicos */}
                    <Route
                    path='/allMedics'
                    element={<AllMedics/>}
                    />
                    {/* Ruta vista de médicos pendientes de validar */}
                    <Route
                    path='/validations'
                    element={<Validations/>}
                    />
                    {/* Ruta para ver su perfil */}
                    <Route
                    path='/myProfile'
                    element={<AdminProfile/>}
                    />
                     {/* Ruta para Edición de perfil */}
                     <Route
                    path='/editProfile'
                    element={<EditAdmin/>}
                    />
                     {/* Ruta para ver perfil de un médico */}
                     <Route
                      path='/medicProfile/:user_id'
                      element={<AdminMedicProfile/>}
                    />
                    {/* Ruta para ver perfil de un paciente */}
                    <Route
                    path='/patientProfile/:user_id'
                    element={<AdminPatientProfile/>}
                    />
                    {/* Ruta para cambiar la contraseña de su cuenta*/}
                    <Route
                    path='/changePassword'
                    element={<ChangePassword/>}
                    />
                  </>
                }


            </Routes>
        </BrowserRouter>
    </div>
  )
}
