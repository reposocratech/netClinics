var express = require('express');
const specialityControllers = require("../controllers/specialityControllers");
var router = express.Router();
//-----------------------------------------------------
//1.- Traer informacion de la busqueda de medicos
//localhost:4000/speciality/getAllSpecialities
router.get("/getAllSpecialities",specialityControllers.getAllSpecialities);

//-----------------------------------------------------
//2.- Traer la informacion de las especialidades de un medico concreto
//localhost:4000/speciality/getSpecialitiesOneMedic/:user_id
router.get("/getSpecialitiesOneMedic/:user_id",specialityControllers.getSpecialitiesOneMedic);

//-----------------------------------------------------
//3.Añadir especialidad a un médico concreto
//localhost:4000/speciality/:user_id
router.post("/:user_id", specialityControllers.addSpeciality);

//-----------------------------------------------------
//4.Borrar especialidad concreta a un médico concreto
//localhost:4000/speciality/:speciality_id/:user_id
router.delete("/:speciality_id/:user_id", specialityControllers.deleteSpeciality);

//-----------------------------------------------------
//5.Borrar una especialidad administrador
//localhost:4000/speciality/:speciality_id
router.delete("/:speciality_id", specialityControllers.deleteSpecialityAdmin);

//-----------------------------------------------------
//6.Editar una especialidad administrador
//localhost:4000/speciality/:speciality_id
router.put("/:speciality_id", specialityControllers.editSpecialityAdmin);

module.exports = router;