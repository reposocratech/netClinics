import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";

export const FormEditUser = ({
  editUser,
  handleChange,
  handleFile,
  onSubmit,
  navigate,
  listProvinces,
  listCities,
  getCity,
}) => {


  return (
      <>
        <Col xs={12} sm={12} md={6} lg={6} className="d-flex justify-content-center align-items-center">
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
          </form>
        </Col>

        <Col  xs={12} sm={12} md={12} lg={6} className="d-flex justify-content-center align-items-center">
          <form encType="multipart/form" className="d-flex flex-column w-50">
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
          </form>

          <div>
            <label>Provincia:</label>
              <select
                name="province_id"
                value={editUser?.province_id}
                onChange={(e) => getCity(e.target.value)}
              >
                {listProvinces?.map((province) => {
                  return (
                    <option
                      key={province?.province_id}
                      value={province?.province_id}
                      
                    >
                      {province?.province_name}
                    </option>

                  );
                })}
              </select>
          </div>
        </Col>

        <Col xs={12} sm={12} md={4} lg={4} className="d-flex justify-content-center align-items-center">
          <form encType="multipart/form" className="d-flex flex-column w-50">

            <label>Ciudad:</label>
            <select value={editUser?.city_id} name="city_id" onChange={handleChange}>
              {listCities?.map((city) => {
                return (
                  <option 
                    key={city?.city_id} 
                    value={city?.city_id}>
                    {city?.city_name}
                  </option>
                );
              })}
            </select>
          </form>
        </Col>

        <Col xs={12} sm={12} md={4} lg={4} className="d-flex justify-content-center align-items-center">
          <form encType="multipart/form" className="d-flex flex-column w-50">

            <label>Codigo postal:</label>
            <input
              className="m-2"
              placeholder="telefono"
              name="postal_code"
              value={editUser?.postal_code}
              onChange={handleChange}
            />
          </form>
        </Col>

        <Col xs={12} sm={12} md={4} lg={4} className="d-flex justify-content-center align-items-center">
          <form encType="multipart/form" className="d-flex flex-column w-50">

            <label>Cambiar imagen:</label>
            <input
              type="file"
              className="m-2"
              autoComplete="off"
              onChange={handleFile}
            />
          </form>
        </Col>

        <div className="d-flex flex-row justify-content-center">
          <Button className="defineButton m-2" onClick={onSubmit}>
            Guardar cambios
          </Button>
          <Button className="defineButton m-2" onClick={() => navigate("/myProfile")}>
            Cancelar
          </Button>
        </div>
      </>
  );
};
