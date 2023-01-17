var express = require('express');
const medicControllers = require("../controllers/medicControllers");
var router = express.Router();
const multerSingleImage = require("../middleware/multerSingleImage");
const multerFiles = require("../middleware/multerFiles");
// const verify = require("../middleware/verify");


//-----------------------------------------------------
//1.- createMedic
//localhost:4000/medics/createMedic
router.post("/createMedic",multerFiles("titles"), medicControllers.createMedic);


//------------------------------------------------------
//3.-Trae la información de un medico
//localhost:4000/medics/oneMedic/:user_id  
router.get("/oneMedic/:user_id", medicControllers.selectOneMedic);


//-----------------------------------------------------
//4.-Trae la informacion de su  disponibilidad
//localhost:4000/medics/getAvailability/:user_id      
router.get("/getAvailability/:user_id", medicControllers.getAvailability);

//-----------------------------------------------------
//5.-Editar un medico 
//localhost:4000/medics/editMedic/:user_id      
router.put("/editMedic/:user_id", multerSingleImage("medic"), medicControllers.editMedic);


//-----------------------------------------------------
//6.-Borrado lógico de un medico
//localhost:4000/medics/deleteMedic/:user_id       
router.delete("/deleteMedic/:user_id", medicControllers.deleteMedic);


//----------------------------------------------------------------
//7.-Trae la información de un usuario para modificarla
//localhost:4000/medics/getEditMedic/:user_id  
router.get("/getEditMedic/:user_id", medicControllers.getEditOneMedic);


//------------------------------------------------------
//8.- Trae todas las citas realizadas de un medico
//localhost:4000/medics/getAppointmentHistory/:user_id 
router.get("/getAppointmentHistory/:user_id", medicControllers.getAppointmentHistory);

//------------------------------------------------------
//8.- Trae todas las citas proximas (tanto confirmadas como pendientes de 
// confirmar) de un medico
//localhost:4000/medics/getPendingAppointments/:user_id 
router.get("/getPendingAppointments/:user_id", medicControllers.getPendingAppointments);

//------------------------------------------------------
//8.- Trae todas las citas proximas (solo confirmadas) de un medico
//localhost:4000/medics/getConfirmedAppointments/:user_id 
router.get("/getConfirmedAppointments/:user_id", medicControllers.getConfirmedAppointments);


module.exports = router;