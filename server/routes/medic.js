var express = require('express');
const medicControllers = require("../controllers/medicControllers");
var router = express.Router();
const multerSingleImage = require("../middleware/multerSingleImage");
const multerFiles = require("../middleware/multerFiles");
const { verify } = require('jsonwebtoken');
// const verify = require("../middleware/verify");


//-----------------------------------------------------
//1.- Crear médico
//localhost:4000/medic/createMedic
router.post("/createMedic",multerFiles("titles"), medicControllers.createMedic);


//------------------------------------------------------
//2.-Trae la información de un medico
//localhost:4000/medic/profile
router.get("/profile", verify, medicControllers.selectOneMedic);


//-----------------------------------------------------
//3.-Trae la informacion de su  disponibilidad
//localhost:4000/medic/availabilities     
router.get("/availabilities", verify, medicControllers.getAvailability);

//-----------------------------------------------------
//4.-Editar un medico 
//localhost:4000/medic/editMedic/:user_id      
router.put("/editMedic/:user_id", multerSingleImage("medic"), medicControllers.editMedic);

//------------------------------------------------------
//5.- Trae todas las citas realizadas de un medico
//localhost:4000/medic/getAppointmentHistory/:user_id 
router.get("/getAppointmentHistory/:user_id", medicControllers.getAppointmentHistory);

//------------------------------------------------------
//6.- Trae todas las citas proximas (tanto confirmadas como pendientes de 
// confirmar) de un medico
//localhost:4000/medic/getPendingAppointments/:user_id 
router.get("/getPendingAppointments/:user_id", medicControllers.getPendingAppointments);

//------------------------------------------------------
//7.- Trae todas las citas proximas (solo confirmadas) de un medico
//localhost:4000/medic/getConfirmedAppointments/:user_id 
router.get("/getConfirmedAppointments/:user_id", medicControllers.getConfirmedAppointments);

//------------------------------------------------------
//8.- Agregar disponibilidad a un médico y borrar dependiendo si está activo o no
//localhost:4000/medic/availabilities
router.post("/availabilities", verify, medicControllers.addAvailability);




module.exports = router;