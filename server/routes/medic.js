var express = require('express');
const medicControllers = require("../controllers/medicControllers");
var router = express.Router();
const multerSingleImage = require("../middleware/multerSingleImage");
const multerFiles = require("../middleware/multerFiles");
// const verify = require("../middleware/verify");


//-----------------------------------------------------
//1.- createMedic
//localhost:4000/medic/createMedic
router.post("/createMedic",multerFiles("titles"), medicControllers.createMedic);


//------------------------------------------------------
//3.-Trae la información de un medico
//localhost:4000/medic/oneMedic/:user_id  
router.get("/oneMedic/:user_id", medicControllers.selectOneMedic);


//-----------------------------------------------------
//4.-Trae la informacion de su  disponibilidad
//localhost:4000/medic/getAvailability/:user_id      
router.get("/getAvailability/:user_id", medicControllers.getAvailability);

//-----------------------------------------------------
//5.-Editar un medico 
//localhost:4000/medic/editMedic/:user_id      
router.put("/editMedic/:user_id", multerSingleImage("medic"), medicControllers.editMedic);


//-----------------------------------------------------
//6.-Borrado lógico de un medico
//localhost:4000/medic/deleteMedic/:user_id       
router.delete("/deleteMedic/:user_id", medicControllers.deleteMedic);


//----------------------------------------------------------------
//7.-Trae la información de un usuario para modificarla
//localhost:4000/medic/getEditMedic/:user_id  
router.get("/getEditMedic/:user_id", medicControllers.getEditOneMedic);


//------------------------------------------------------
//8.- Trae todas las citas realizadas de un medico
//localhost:4000/medic/getAppointmentHistory/:user_id 
router.get("/getAppointmentHistory/:user_id", medicControllers.getAppointmentHistory);

//------------------------------------------------------
//8.- Trae todas las citas proximas (tanto confirmadas como pendientes de 
// confirmar) de un medico
//localhost:4000/medic/getPendingAppointments/:user_id 
router.get("/getPendingAppointments/:user_id", medicControllers.getPendingAppointments);

//------------------------------------------------------
//8.- Trae todas las citas proximas (solo confirmadas) de un medico
//localhost:4000/medic/getConfirmedAppointments/:user_id 
router.get("/getConfirmedAppointments/:user_id", medicControllers.getConfirmedAppointments);


module.exports = router;