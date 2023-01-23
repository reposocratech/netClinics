import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";

export const FormEditUser = ({
  editUser,
  handleChange,
  handleFile,
  onSubmit,
  navigate,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <form encType="multipart/form" className="d-flex flex-column w-50">
            <h2>Editar usuario</h2>
            <hr />
            <label>Nombre:</label>
            <input
              className="m-2"
              placeholder="Name"
              name="name"
              value={editUser?.name}
              onChange={handleChange}
            />

            <label>Apellidos:</label>
            <input
              className="m-2"
              placeholder="Apellidos"
              name="lastname"
              value={editUser?.lastname}
              onChange={handleChange}
            />

            <label>Email:</label>
            <input
              className="m-2"
              placeholder="Email"
              name="email"
              value={editUser?.email}
              onChange={handleChange}
            />

            <label>Teléfono:</label>
            <input
              className="m-2"
              placeholder="telefono"
              name="phone_number"
              value={editUser?.phone_number}
              onChange={handleChange}
            />

            <label>Dirección:</label>
            <input
              className="m-2"
              placeholder="direccion"
              name="address"
              onChange={handleChange}
              value={editUser?.address}
            />

            <label>Codigo postal:</label>
            <input
              className="m-2"
              placeholder="telefono"
              name="postal_code"
              value={editUser?.postal_code}
              onChange={handleChange}
            />
            <label>Cambiar imagen:</label>
            <input
              type="file"
              className="m-2"
              autoComplete="off"
              onChange={handleFile}
            />

            <div>
              <Button className="m-2" onClick={onSubmit}>
                Guardar cambios
              </Button>
              <Button className="m-2" onClick={() => navigate("/myProfile")}>
                Cancelar
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};
