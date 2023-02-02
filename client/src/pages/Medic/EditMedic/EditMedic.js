import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NetClinicsContext } from "../../../context/NetClinicsProvider";
import axios from "axios";
import { emailValidator } from "../../../Utils/checkEmail/checkEmail";
import { FormEditMedic } from "../../../components/Forms/FormEditMedic/FormEditMedic";
import "./editMedicProfile.scss";


const initialValue = {
  address: "",
  avatar: "",
  city_id: "", 
  dni: "",
  email: "",
  lastname: "",   
  medic_description: "",
  medic_is_on_vacation: "",
  medic_membership_number: "", 
  medic_price: "",
  name: "",
  phone_number: "",
  postal_code: "",
  province_id: "",
  user_id: "",
}


export const EditMedic = () => {
  const navigate = useNavigate();

  const { token, user, setResetPage, resetPage } = useContext(NetClinicsContext);

  const [dataUser, setDataUser] = useState(initialValue);
  const [dataTitles, setDataTitles] = useState([]);
  const [dataSpecialities, setDataSpecialities] = useState([]);
  const [providerServices, setProviderServices] = useState([]);

  const [errorEmail, setErrorEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [listCities, setListCities] = useState([]);
  const [listProvinces, setListProvinces] = useState([]);

  //Peticios Axios
  useEffect(() => {
    //Peticion para traer todas las provincias
    axios
      .get("http://localhost:4000/place/getAllProvince/")
      .then((res) => {
        setListProvinces(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //Petición para traer todas las ciudades de una provincia concreta
    axios
      .get(`http://localhost:4000/place/getAllCity/${user?.province_id}`)
      .then((res) => {
        setListCities(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //petición para traer las provincias/ciudades donde presta servicio el médico
    if (!user.user_id) return;
    axios
      .get(`http://localhost:4000/medic/providerServices/${user?.user_id}`)
      .then((res) => {
        setProviderServices(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);
  //--------------------------------------------------------------------------

  //Función para traer todas las ciudades de una provincia enviada como parámetro
  const getCity = (selectedProvince) => {
    if (selectedProvince) {
      axios
        .get(`http://localhost:4000/place/getAllCity/${selectedProvince}`)
        .then((res) => {
          setListCities(res.data);
          setDataUser({ ...dataUser, province_id: selectedProvince });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  //--------------------------------------------------------------------------

  //Objeto con el titulo y para abrir y cerrar modal
  const [editTitle, setEditTitle] = useState({
    open: false,
    title: null,
  });
  //----------------------------------------------------------------------------

  //Modal para añadir datos academicos
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //----------------------------------------------------------------------------

  //Modal para añadir especialidades
  const [showSpecialities, setShowSpecialities] = useState(false);
  const handleCloseSpecialities = () => setShowSpecialities(false);
  const handleShowSpecialities = () => setShowSpecialities(true);
  //----------------------------------------------------------------------------

  //Modal para añadir provincia y ciudad donde preste servicios médico
  const [showProviderService, setShowProviderService] = useState(false);
  const handleCloseProviderService = () => setShowProviderService(false);
  const handleShowProviderService = () => setShowProviderService(true);

  //Función para setear edición título, objeto con modal y titulo
  const editTitleMedic = (title) => {
    setEditTitle({ open: true, title });
  };
  //----------------------------------------------------------------------------

  //Vista previa imagen cuando subo una nueva al input type file
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  //----------------------------------------------------------------------------

  //useEffect para que esté pendiente la imagen seleccionada
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  //-------------------------------------------------------------------------

  //useEffect para devolver datos del perfil médico
  //se comprueba en la peticion el token para devolver datos del usuario
  //logueado
  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };

    if (!user.user_id) return;

    axios
      .get("http://localhost:4000/medic/profile")
      .then((res) => {
        setDataUser(res.data.user[0]);
        setDataTitles(res.data.titles);
        setDataSpecialities(res.data.specialities);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, token]);
  //----------------------------------------------------------------------------

  //Conforme se cambie la imagen setea el archivo seleccionado y la imagen
  //que se mandará a base de datos
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  //----------------------------------------------------------------------------

  //handleChange usuario
  const handleChange = (e) => {
    setErrorEmail("");
    const { name, value } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  };
  //----------------------------------------------------------------------------


  //Submit modificar cambios usuario
  const onSubmit = () => {

      const newFormData = new FormData();
      newFormData.append("file", image);
      newFormData.append("editMedic", JSON.stringify(dataUser));
    
      if(dataUser.name !== "" && dataUser.lastname !== "" && dataUser.phone_number !== "" && dataUser.email !== "" && dataUser.postal_code !== ""){
        if(emailValidator(dataUser.email)){
          if(!isNaN(parseInt(dataUser.phone_number))){
            if(!isNaN(parseInt(dataUser.postal_code))){
              axios
              .put(
                `http://localhost:4000/medic/editMedic/${dataUser?.user_id}`,
                newFormData
              )
              .then((res) => {
                setResetPage(!resetPage);
                navigate("/myProfile");
              })
              .catch((error) => {
                if (error.response.data.code === "ER_DUP_ENTRY") {
                  setErrorEmail("errorMail");
                } else {
                  console.log(error);
                }
              });
            }
            else{
              setErrorMessage("El Código Postal no es correcto");
            }
          }
          else{
            setErrorMessage("El Teléfono no es correcto");
          }
        }
        else{
          setErrorMessage("El email introducido no es válido");
        }
      }
      else{
        setErrorMessage("Hay campos que no pueden quedar vacíos");

      }
      
  };
  //----------------------------------------------------------------------------

  //Borrar título
  const deleteTitle = (title, title_name) => {
    if (window.confirm(`¿Deseas borrar el dato académico ${title_name}?`)) {
      axios.delete(`http://localhost:4000/title/${title}`).then((res) => {
        setResetPage(!resetPage);
      });
    }
  };
  //----------------------------------------------------------------------------

  //Borrar especialidad
  const deleteSpeciality = (speciality_id, speciality_name) => {
    if (window.confirm(`¿Deseas borrar la especialidad ${speciality_name}?`)) {
      axios
        .delete(
          `http://localhost:4000/speciality/${speciality_id}/${user.user_id}`
        )
        .then((res) => {
          setResetPage(!resetPage);
        });
    }
  };
  //----------------------------------------------------------------------------
  //Borrar una provincia y ciudad donde presta servicio médico
  const deleteProviderService = (
    province_id,
    province_name,
    city_id,
    city_name
  ) => {
    if (
      window.confirm(
        `¿Deseas borrar la zona de servicio ${province_name} ${city_name}?`
      )
    ) {
      axios
        .delete(
          `http://localhost:4000/medic/providerServices/${user.user_id}/${province_id}/${city_id}`
        )
        .then((res) => {
          setResetPage(!resetPage);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //----------------------------------------------------------------------------

  //Activar & Desactivar vacaciones
  const vacation = () => {
    let url = `http://localhost:4000/admin/onVacation/${dataUser?.user_id}`;

    if (dataUser?.medic_is_on_vacation === 1) {
      url = `http://localhost:4000/admin/offVacation/${dataUser?.user_id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setResetPage(!resetPage);
      })
      .catch((err) => console.log(err));
  };

  //---------------------------------------------------------------------------

  return (
    <>
      <FormEditMedic
        dataUser={dataUser}
        onSelectFile={onSelectFile}
        preview={preview}
        navigate={navigate}
        vacation={vacation}
        handleChange={handleChange}
        errorEmail={errorEmail}
        getCity={getCity}
        listProvinces={listProvinces}
        listCities={listCities}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
        dataTitles={dataTitles}
        editTitleMedic={editTitleMedic}
        deleteTitle={deleteTitle}
        handleShow={handleShow}
        dataSpecialities={dataSpecialities}
        deleteSpeciality={deleteSpeciality}
        handleShowSpecialities={handleShowSpecialities}
        providerServices={providerServices}
        deleteProviderService={deleteProviderService}
        handleShowProviderService={handleShowProviderService}
        show={show}
        user={user}
        handleClose={handleClose}
        setResetPage={setResetPage}
        resetPage={resetPage}
        showSpecialities={showSpecialities}
        showProviderService={showProviderService}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        handleCloseSpecialities={handleCloseSpecialities}
        handleCloseProviderService={handleCloseProviderService}
      />
    </>
  );
};
