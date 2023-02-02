import React, { useContext } from "react";
import { Col, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";

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
  messageErrorEmail
}) => {

  const { user } =
  useContext(NetClinicsContext);

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
            {user?.name} {user?.lastname}
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
        <form encType="multipart/form" className="colEditUser d-flex flex-column">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" className="inputRegister">
                <i className="fa-solid fa-user"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Edita nombre"
                name="name"
                type="text"
                autoComplete="off"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
                value={editUser?.name}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup className={`inputPatient ${errorEmail && errorEmail} mb-3`}
            >
              <InputGroup.Text id="basic-addon1" className="inputRegister">
                <i className="fa-solid fa-envelope"></i>
              </InputGroup.Text>

              <Form.Control
                placeholder="Edita email"
                name="email"
                type="email"
                autoComplete="off"
                aria-label="Email"
                value={editUser?.email}
                onChange={handleChange}
                aria-describedby="basic-addon1"
                required
              />
            </InputGroup>

            {errorEmail && (
              <div>
                <h4 className="text-danger">El email ya existe en nuestra BD</h4>
               
              </div>
            )}
            {messageErrorEmail && <h4 className="text-danger">{messageErrorEmail}</h4>}
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" className="inputRegister">
                <i className="fa-solid fa-map-location"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Edita dirección"
                name="address"
                type="text"
                autoComplete="off"
                aria-label="Dirección"
                aria-describedby="basic-addon1"
                value={editUser?.address === "null" ? "" : editUser?.address}
                onChange={handleChange}
              />
            </InputGroup>

          <InputGroup className="mb-3">
              <div className="d-flex w-100">
                <InputGroup.Text
                  id="basic-addon1"
                  className="inputRegister iconSelect"
                >
                  <i className="fa-solid fa-city"></i>
                </InputGroup.Text>
                <Form.Select
                  className="selectPatient"
                  value={editUser?.city_id}
                  name="city_id"
                  onChange={handleChange}
                >
                  <option>Edita ciudad</option>
                  {listCities?.map((city) => {
                    return (
                      <option key={city?.city_id} value={city?.city_id}>
                        {city?.city_name}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
            </InputGroup>
        </form>
      </Col>

      <Col
        xs={12}
        sm={12}
        md={12}
        lg={6}
        className="d-flex justify-content-center align-items-center"
      >
        <form encType="multipart/form" className="colEditUser d-flex flex-column">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" className="inputRegister">
                <i className="fa-solid fa-user"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Edita apellido"
                name="lastname"
                type="text"
                autoComplete="off"
                aria-label="Apellido"
                aria-describedby="basic-addon1"
                value={editUser?.lastname}
                onChange={handleChange}
                required
              />
            </InputGroup>
          
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" className="inputRegister">
                <i className="fa-solid fa-phone"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Introduce tu Nº de Teléfono"
                name="phone_number"
                type="text"
                autoComplete="off"
                aria-label="Nº de Teléfono"
                aria-describedby="basic-addon1"
                value={editUser?.phone_number}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <div className="d-flex w-100">
                <InputGroup.Text
                  id="basic-addon1"
                  className="inputRegister iconSelect"
                >
                  <i className="fa-solid fa-city"></i>
                </InputGroup.Text>
                <Form.Select
                  className="selectPatient"
                  name="province_id"
                  value={editUser?.province_id}
                  onChange={(e) => getCity(e.target.value)}
                >
                  <option>Edita provincia</option>
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
                </Form.Select>
              </div>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" className="inputRegister">
                <i className="fa-solid fa-location-pin"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Edita Código Postal"
                name="postal_code"
                type="text"
                autoComplete="off"
                aria-label="Código Postal"
                aria-describedby="basic-addon1"
                value={editUser?.postal_code === 0 ? "" : editUser?.postal_code}
                onChange={handleChange}
              />
            </InputGroup>
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
