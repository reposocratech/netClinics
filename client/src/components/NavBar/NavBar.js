import React, { useContext } from 'react'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate, Link } from "react-router-dom";
import { NetClinicsContext } from '../../context/NetClinicsProvider';
import "./Navbar.scss";

export const NavBar = () => {

    const {setIsLogged, user, setUser} = useContext(NetClinicsContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        navigate("/");
        setIsLogged(false);
        setUser(null);
    };

    const UserMenu = (
        <img
          src={`/assets/images/user/${user.avatar}`}
          alt="Imagen Usuario"
          style={{ width: "40px", borderRadius: 400 / 2 }}
        />
    );

  return (
    <Navbar bg="light" expand="lg">
      <Container container-fluid>
        <Navbar.Brand Link={"/"}>
          <img
            src="/assets/images/logo/Logo-NetClinics1-01.png"
            style={{width: '10rem'}}
            className="d-inline-block align-top"
            alt="NetClinics' Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link Link={"/"}>Clientes</Nav.Link>
            <Nav.Link Link={"/"}>Fisioterapeutas</Nav.Link>
          </Nav>

          {/* lado derecho del navbar */}
          <Nav>
            <NavDropdown id="nav-dropdown-dark-example" title={UserMenu}>
              <NavDropdown.Item Link={"/"}>Mi perfil</NavDropdown.Item>
              <NavDropdown.Item Link={"/"}>
                Cambiar contraseña
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
