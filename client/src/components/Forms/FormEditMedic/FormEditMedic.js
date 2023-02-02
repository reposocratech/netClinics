import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Table from "react-bootstrap/Table";
import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Button } from "react-bootstrap";
import { FormAddTitlesMedic } from "../FormAddTitlesMedic/FormAddTitlesMedic";
import { FormEditTitlesMedic } from "../FormEditTitlesMedic/FormEditTitlesMedic";
import { FormAddSpecialityMedic } from "../FormAddSpecialityMedic/FormAddSpecialityMedic";
import { FormAddProviderServiceMedic } from "../FormAddProviderServiceMedic/FormAddProviderServiceMedic";

export const FormEditMedic = ({
        dataUser,
        onSelectFile,
        preview,
        navigate,
        vacation,
        handleChange,
        errorEmail,
        getCity,
        listProvinces,
        listCities,
        errorMessage,
        onSubmit,
        dataTitles,
        editTitleMedic,
        deleteTitle,
        handleShow,
        dataSpecialities,
        deleteSpeciality,
        handleShowSpecialities,
        providerServices,
        deleteProviderService,
        handleShowProviderService,
        show,
        user,
        handleClose,
        setResetPage,
        resetPage,
        showSpecialities,
        showProviderService,
        editTitle,
        setEditTitle,
        handleCloseSpecialities,
        handleCloseProviderService,
}) => {
  return (
    <>
      <div className="backgroundEditProfileMedic py-3 pb-3 pe-1 ps-1 d-flex align-items-center justify-content-center">
        <Container className="aboutme-editprofile-medic pb-3">
          <Row className="p-3">
            <Col sm="12" md="4">
              <h2>Nº de Colegiado</h2>
              <p>{dataUser?.medic_membership_number}</p>
            </Col>
            <Col className="text-center d-flex align-items center justify-content-center gap-5">
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
                        backgroundImage: `url(/assets/images/user/${dataUser?.avatar})`,
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </Col>
            <Col className="d-flex justify-content-end gap-5">
              <Form>
                <Form.Check
                  defaultChecked
                  onClick={() => navigate("/myProfile")}
                  type="switch"
                  id="custom-switch"
                  label="Ver Perfil"
                />
              </Form>
              <Form>
                <Form.Check
                  checked={dataUser?.medic_is_on_vacation}
                  onClick={vacation}
                  type="switch"
                  id="custom-switch"
                  label="Vacaciones"
                />
              </Form>
            </Col>
          </Row>

          {/* Datos Médico */}
          {/* Sobre mí */}
          <Row className="ms-2 me-2 mb-3 fondos_Sections">
            <Col xs="12" md="12" className="mb-3">
              <h4>Sobre mí</h4>
              <hr className="separador" />
            </Col>
            <Col xs="12" md="12">
              <FloatingLabel className="mb-3" controlId="floatingTextarea2">
                <Form.Control
                  as="textarea"
                  name="medic_description"
                  value={dataUser?.medic_description === "null" || dataUser?.medic_description === undefined ? "" : dataUser?.medic_description}
                  onChange={handleChange}
                  placeholder="Sobre mí"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Col>
          </Row>
          {/* Nombre y Apellidos */}
          <Row className="fondos_Sections ms-2 me-2 mb-3">
            <Col xs="12 mb-3">
              <h4>Datos Personales</h4>
              <hr className="separador" />
            </Col>
            <Col xs="12" md="6">
              <label>Nombre:</label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Escribe tu Nombre"
                  name="name"
                  type="text"
                  autoComplete="off"
                  aria-label="Nombre"
                  aria-describedby="basic-addon1"
                  value={dataUser?.name}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Col>
            <Col xs="12" md="6">
              <label>Apellidos:</label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Escribe tus Apellidos"
                  name="lastname"
                  type="text"
                  autoComplete="off"
                  aria-label="Apellidos"
                  aria-describedby="basic-addon1"
                  value={dataUser?.lastname}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Col>
            <Col xs="12" md="6">
              <label>Teléfono:</label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Introduce teléfono"
                  name="phone_number"
                  type="text"
                  autoComplete="off"
                  aria-label="Teléfono"
                  aria-describedby="basic-addon1"
                  value={dataUser?.phone_number}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Col>
            <Col className={`${errorEmail && errorEmail}`} xs="12" md="6">
              <label>Email:</label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Introduce Correo Electronico"
                  name="email"
                  type="text"
                  autoComplete="off"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  value={dataUser?.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Col>
            {/* Provincia Médico */}
            <Col xs="12" md="4">
              <label>Provincia:</label>
              <InputGroup className="mb-3">
                <Form.Select
                  value={dataUser?.province_id}
                  onChange={(e) => getCity(e.target.value)}
                  name="province_id"
                  aria-label="Default select example"
                >
                  {listProvinces?.map((province, i) => {
                    return (
                      <option
                        key={i}
                        value={province?.province_id}
                      >
                        {province?.province_name}
                      </option>
                    );
                  })}
                </Form.Select>
              </InputGroup>
            </Col>
            {/* Ciudad Médico */}
            <Col xs="12" md="4">
              <label>Ciudad:</label>
              <InputGroup className="mb-3">
                <Form.Select
                  value={dataUser?.city_id}
                  name="city_id"
                  onChange={handleChange}
                  aria-label="Default select example"
                >
                  {listCities?.map((city, i) => {
                    return (
                      <option key={i} value={city?.city_id}>
                        {city?.city_name}
                      </option>
                    );
                  })}
                </Form.Select>
              </InputGroup>
            </Col>
            <Col xs="12" md="4">
              <label>Código Postal:</label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Código Postal"
                  name="postal_code"
                  type="text"
                  autoComplete="off"
                  aria-label="postal_code"
                  aria-describedby="basic-addon1"
                  value={dataUser?.postal_code}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Col>
          </Row>
          {errorMessage &&
            <Row>
              <Col>
                <h4 className="text-center text-danger">{errorMessage}</h4>
              </Col>
            </Row>
          }
          {/* Datos Profesionales */}
          <Row className="fondos_Sections ms-2 me-2 mb-3">
            <Col xs="12 mb-3">
              <h4>Datos Profesionales</h4>
              <hr className="separador" />
            </Col>
            <Col xs="12" md="6">
              <label>Precio Consulta:</label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Precio consulta"
                  name="medic_price"
                  type="text"
                  autoComplete="off"
                  aria-label="medic_price"
                  aria-describedby="basic-addon1"
                  value={dataUser?.medic_price}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Col>
            <Col xs="12" md="6">
              <label>Nº Colegiado:</label>
              <p>{dataUser?.medic_membership_number}</p>
            </Col>
          </Row>
          <Row>
            {/* Botón para guardar cambios edición perfil*/}
            <Col className="gap-4 align-items-center justify-content-center d-flex">
              <Button className="defineButton" onClick={onSubmit}>
                Guardar Cambios Perfil
              </Button>
              <Button
                className="defineButtonDanger"
                onClick={() => navigate(-1)}
              >
                Cancelar Cambios
              </Button>
            </Col>
          </Row>

          {/* Titulos */}
          <Row className="ms-2 me-2 my-3 mb-3 hiddenIphone">
            <Col sm="12" md="12" className="mb-3 fondos_Sections">
              <h4>Datos Académicos & Profesionales</h4>
              <hr className="separador" />
              <Table className="my-2 text-center my-3" striped bordered hover>
                <thead>
                  <tr>
                    <th>Estudios</th>
                    <th>Universidad</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Descargar</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTitles?.map((title, i) => {
                    return (
                        <tr key={i}>
                          <td>
                            {title?.text === "" || title?.text === null || title?.text === "null"
                              ? "Nombre del título"
                              : title?.text}
                          </td>
                          <td>
                            {title?.university === "" ||
                            title?.university === null || title?.university === "null"
                              ? "Nombre Universidad / Colegio"
                              : title?.university}
                          </td>
                          <td>
                            {title?.start_date === "" ||
                            title?.start_date === "null" ||
                            title?.start_date === null
                              ? "Sin Fecha"
                              : title?.start_date}
                          </td>
                          <td>
                            {title?.end_date === "" ||
                            title?.end_date === "null" ||
                            title?.end_date === null
                              ? "Sin Fecha"
                              : title?.end_date}
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                window.open(
                                  `/assets/docs/titles/${title.document}`
                                )
                              }
                            >
                              <FilePresentRoundedIcon />
                            </button>
                          </td>
                          <td>
                            <button onClick={() => editTitleMedic(title)}>
                              <EditRoundedIcon />
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                deleteTitle(title?.title_id, title?.text)
                              }
                            >
                              <DeleteForeverRoundedIcon />
                            </button>
                          </td>
                        </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            {/* Boton para añadir datos académicos */}
            <Col
              sm="12"
              md="12"
              className="d-flex align-items-center justify-content-center gap-3"
            >
              <Button className="defineButton" onClick={handleShow}>
                Añadir Datos Académicos
              </Button>
            </Col>
          </Row>

          {/* SOLO IPHONE (MOVILES) */}

           {/* Titulos */}
           <Row className="ms-2 me-2 my-3 mb-3 iphoneTable">
            <Col sm="12" md="12" className="mb-3 fondos_Sections">
              <h4>Datos Académicos & Profesionales</h4>
              <hr className="separador" />
              <Table className="my-2 text-center my-3" striped bordered hover>
                <thead>
                  <tr>
                    <th>Estudios</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTitles?.map((title, i) => {
                    return (
                        <tr key={i}>
                          <td>
                            {title?.text === "" || title?.text === null || title?.text === "null"
                              ? "Nombre del título"
                              : title?.text}
                          </td>
                          <td>
                            <button onClick={() => editTitleMedic(title)}>
                              <EditRoundedIcon />
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                deleteTitle(title?.title_id, title?.text)
                              }
                            >
                              <DeleteForeverRoundedIcon />
                            </button>
                          </td>
                        </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            {/* Boton para añadir datos académicos */}
            <Col
              sm="12"
              md="12"
              className="d-flex align-items-center justify-content-center gap-3"
            >
              <Button className="defineButton" onClick={handleShow}>
                Añadir Datos Académicos
              </Button>
            </Col>
          </Row>

          {/* Especialidades */}
          <Row className="ms-2 me-2 my-3 mb-3 fondos_Sections">
            <Col sm="12" md="12" lg="6" className="mb-3">
              {dataSpecialities.length !== 0 ? (
                <>
                  <h4>Especialidades</h4>
                  <hr className="separador" />
                  <Table className="my-4" striped bordered hover>
                    <thead>
                      <tr>
                        <th>Especialidad</th>
                        <th className="text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataSpecialities.map((el, i) => {
                        return (
                          <tr key={i}>
                            <td>{el.speciality_name}</td>
                            <td className="text-center">
                              <button
                                onClick={() =>
                                  deleteSpeciality(
                                    el.speciality_id,
                                    el.speciality_name
                                  )
                                }
                              >
                                <DeleteForeverRoundedIcon />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  {/* Boton para añadir Especialidades */}
                  <div className="text-center">
                    <Button
                      className="defineButton"
                      onClick={handleShowSpecialities}
                    >
                      Añadir Especialidades
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h4 className="text-center">
                    Actualmente no tienes agregada ninguna especialidad, agregue
                    una
                  </h4>
                  <div className="text-center my-4">
                    <Button
                      className="defineButton"
                      onClick={handleShowSpecialities}
                    >
                      Añadir Especialidades
                    </Button>
                  </div>
                </>
              )}
            </Col>
            {/* ------------------------------------------------------------------ */}
            {/* Prestación servicios Provincias y Ciudades */}
            <Col>
              <h4>Prestación Servicios</h4>
              <hr className="separador" />
              <Table className="my-4" striped bordered hover>
                <thead>
                  <tr>
                    <th>Provincia</th>
                    <th>Ciudad</th>
                    <th className="text-center">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {providerServices.map((services, i) => {
                    return (
                      <tr key={i}>
                        <td>{services.province_name}</td>
                        <td>{services.city_name}</td>
                        <td className="text-center">
                          <button
                            onClick={() =>
                              deleteProviderService(
                                services.province_id,
                                services.province_name,
                                services.city_id,
                                services.city_name
                              )
                            }
                          >
                            <DeleteForeverRoundedIcon />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div className="text-center">
                <Button
                  className="defineButton"
                  onClick={handleShowProviderService}
                >
                  Añadir Provincia/Ciudad
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* -------------------------------------------------------------------- */}
      {/* Modal para Añadir Titulos */}
      {show && (
        <FormAddTitlesMedic
          user={user}
          show={show}
          handleClose={handleClose}
          setResetPage={setResetPage}
          resetPage={resetPage}
        />
      )}

      {/* -------------------------------------------------------------------- */}
      {/* Modal para Añadir Especialidades */}
      {showSpecialities && (
        <FormAddSpecialityMedic
          user={user}
          resetPage={resetPage}
          setResetPage={setResetPage}
          showSpecialities={showSpecialities}
          handleCloseSpecialities={handleCloseSpecialities}
          handleShowSpecialities={handleShowSpecialities}
        />
      )}
      {/* -------------------------------------------------------------------- */}
      {/* Modal para Añadir Prestacion de Servicios (Provincia, Ciudad)*/}
      {showProviderService && (
        <FormAddProviderServiceMedic
          user={user}
          resetPage={resetPage}
          setResetPage={setResetPage}
          showProviderService={showProviderService}
          handleCloseProviderService={handleCloseProviderService}
          handleShowProviderService={handleShowProviderService}
          listProvinces={listProvinces}
        />
      )}
      {editTitle.open && (
        <FormEditTitlesMedic
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          title={editTitle.title}
          setResetPage={setResetPage}
          resetPage={resetPage}
        />
      )}
    </>

  )
}
