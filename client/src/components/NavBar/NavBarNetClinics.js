import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { NetClinicsContext } from '../../context/NetClinicsProvider';
import Button from 'react-bootstrap/Button';
import { removeLocalStorage } from '../../Utils/localStorage/localStorageNetClinics';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';

import './NavbarNetClinics.scss'

export const NavBarNetClinics = () => {

  const navigate = useNavigate();
  const {user, setUser, isLogged, setIsLogged} = useContext(NetClinicsContext)
  
  const logOut = () => {
    setIsLogged(false);
    setUser({});
    removeLocalStorage();
    navigate('/');
  }

  return (
    <Navbar className='bgNavbar' expand="lg">
    <Container>
            
      <Navbar.Brand>
        <img className='logoNavbar' src="/assets/images/logo/Logo-NetClinics1-01.png"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

          {user?.type === 2 && 
          <> 
            <Nav.Link as={Link} to="/homeMedic">Home</Nav.Link>
          </>
          }

        </Nav>
       
      </Navbar.Collapse>
      
      {isLogged &&
        <>
          {!user?.avatar ? 
              <NavDropdown className='menuDesplegable' title={
                <div className='avatar me-3'>
                  {user?.name?.charAt(0)}
                </div>
              } id="navbarScrollingDropdown">
                <NavDropdown.Item><PersonIcon/> Mi perfil</NavDropdown.Item>
                <NavDropdown.Item><LockIcon/> Cambiar Contraseña</NavDropdown.Item>
                <NavDropdown.Item><LogoutIcon/> Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
          :
              <NavDropdown className='menuDesplegable' title={
                <div>
                  <img className='avatarLogo me-3' src={`/assets/images/user/${user?.avatar}`}/>
                </div>
              } id="navbarScrollingDropdown">
                <NavDropdown.Item><PersonIcon/> Mi perfil</NavDropdown.Item>
                <NavDropdown.Item><LockIcon/> Cambiar Contraseña</NavDropdown.Item>
                <NavDropdown.Item onClick={logOut}><LogoutIcon/> Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
          }
        </>
      }
    </Container>
    </Navbar>
  )
}
