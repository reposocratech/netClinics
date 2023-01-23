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
router.get("/getSpecialitiesOneMedic/:user_id",specialityControllers.getSpecialitiesOneMedic)
module.exports = router;