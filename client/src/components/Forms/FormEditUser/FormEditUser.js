import React from "react";
import { Col, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export const FormEditUser = ({
  editUser,
  handleChange,
  onSubmit,
  navigate,
  listProvinces,
  listCities,
  getCity,
  onSelectFile,
  preview,
  errorEmail,
}) => {
  return (
    <>
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        className="d-flex justify-content-end me-3"
      >
        <Form>
          <Form.Check
            defaultChecked
            onClick={() => navigate("/myProfile")}
            type="switch"
            id="custom-switch"
            label="Ver Perfil"
          />
        </Form>
      </Col>

      {/* Foto Perfil */}
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        className="d-flex justify-content-center text-center"
      >
        <div className="avatar-upload">
          <div className="avatar-edit">
            <input
              type="file"
              onChange={onSelectFile}
              name="img"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
            />
            <label htmlFor="imageUpload"></label>
          </div>
          <div className="avatar-preview">
            {preview && (
              <div
                id="imagePreview"
                style={{ backgroundImage: `url(${preview})` }}
              ></div>
            )}
            {!preview && (
              <div
                id="imagePreview"
                style={{
                  backgroundImage: `url(/assets/images/user/${editUser?.avatar})`,
                }}
              ></div>
            )}
          </div>
          <h2 className="my-3">
            {editUser?.name} {editUser?.lastname}
          </h2>
        </div>
      </Col>

      {/* Datos Paciente */}
      {/* Sobre mí */}
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={6}
        className="d-flex justify-content-center align-items-center"
      >
        <form encType="multipart/form" className="d-flex flex-column">
          <div className="contEditPatient d-flex flex-row align-items-center">
            <label className="me-2">Nombre:</label>
            <InputGroup className="inputPatient mb-3">
              <Form.Control
                placeholder="Nombre"
                name="name"
                value={editUser?.name}
                onChange={handleChange}
              />
            </InputGroup>
          </div>

          <div className="contEditPatient d-flex flex-row align-items-center">
            <label className="me-2">Apellidos:</label>
            <InputGroup className="inputPatient mb-3">
              <Form.Control
                placeholder="Apellidos"
                name="lastname"
                value={editUser?.lastname}
                onChange={handleChange}
              />
            </InputGroup>
          </div>

          <div className="contEditPatient d-flex flex-row align-items-center">
            <label className="me-2">Email:</label>
            <InputGroup
              className={`inputPatient ${errorEmail && errorEmail} mb-3`}
            >
              <Form.Control
                autoComplete="off"
                placeholder="Email"
                name="email"
                value={editUser?.email}
                onChange={handleChange}
              />
            </InputGroup>
          </div>

          {errorEmail && (
            <div>
              <h4 className="text-danger">El email ya existe en nuestra BD</h4>
            </div>
          )}

          <div className="contEditPatient d-flex flex-row align-items-center">
            <label className="me-2">Teléfono:</label>
            <InputGroup className="inputPatient mb-3">
              <Form.Control
                placeholder="Teléfono"
                name="phone_number"
                value={editUser?.phone_number}
                onChange={handleChange}
              />
            </InputGroup>
          </div>
        </form>
      </Col>

      <Col
        xs={12}
        sm={12}
        md={12}
        lg={6}
        className="d-flex justify-content-center align-items-center"
      >
        <form encType="multipart/form" className="d-flex flex-column">
          <div className="contEditPatient d-flex flex-row align-items-center">
            <label className="me-2">Dirección:</label>
            <InputGroup className="inputPatient mb-3">
              <Form.Control
                placeholder="Dirección"
                name="address"
                value={editUser?.address}
                onChange={handleChange}
              />
            </InputGroup>
          </div>

          <div className="contEditPatient d-flex flex-row align-items-end mb-3">
            <label className="me-2">Provincia:</label>
            <select
              className="selectPatient"
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

          <div className="contEditPatient d-flex flex-row align-items-end mb-3">
            <label className="me-2">Ciudad:</label>
            <select
              className="selectPatient"
              value={editUser?.city_id}
              name="city_id"
              onChange={handleChange}
            >
              {listCities?.map((city) => {
                return (
                  <option key={city?.city_id} value={city?.city_id}>
                    {city?.city_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="contEditPatient d-flex flex-row align-items-center">
            <label className="me-2">Codigo postal:</label>
            <InputGroup className="inputPatient mb-3">
              <Form.Control
                placeholder="Código Postal"
                name="postal_code"
                value={editUser?.postal_code === 0 ? "" : editUser?.postal_code}
                onChange={handleChange}
              />
            </InputGroup>
          </div>
        </form>
      </Col>

      <div className="contEditPatient d-flex flex-row justify-content-center mb-2">
        <Button className="defineButton m-2" onClick={onSubmit}>
          Guardar cambios
        </Button>
      </div>
    </>
  );
};
