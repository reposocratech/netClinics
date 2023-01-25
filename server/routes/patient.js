var express = require('express');
const patientController = require("../controllers/patientControllers");
var router = express.Router();
const multerSingleImage = require("../middleware/multerSingleImage");
// const verify = require("../middleware/verify");


//-----------------------------------------------------
//1.- Crear paciente
//localhost:4000/patient/createPatient
router.post("/createPatient", multerSingleImage("user"), patientController.createPatient);

//------------------------------------------------------
//2.-Trae la información de un paciente
//localhost:4000/patient/onePatient/:user_id  
router.get("/onePatient/:user_id", patientController.selectOnePatient);

//------------------------------------------------------
//3.-Trae la informacion de un medico
//localhost:4000/patient/getMedicsName/:user_id 
router.get("/getMedicsName", patientController.getMedicsName);

//----------------------------------------------------------------
//4.-Trae la información de un usuario para modificarla
//localhost:4000/patient/getEditPatient/:user_id  
router.get("/getEditPatient/:user_id", patientController.getEditPatient);

//-----------------------------------------------------
//5.-Editar un usuario 
//localhost:4000/patient/editPatient/:user_id       
router.put("/editPatient/:user_id", multerSingleImage("user"), patientController.editPatient);

//----------------------------------------------------------------
//6.-Trae todas las citas realizadas de un paciente
//localhost:4000/patient/getAppointmentHistory/:user_id  
router.get("/getAppointmentHistory/:user_id", patientController.getAppointmentHistory);

//----------------------------------------------------------------
//7.-Trae todas las citas proximas (tanto confirmadas como pendientes de confirmar) de un paciente
//localhost:4000/patient/getAppointmentHistory/:user_id  
router.get("/getPendingAppointments/:user_id", patientController.getPendingAppointments);

//----------------------------------------------------------------
//8.-Trae todas las citas realizadas de un paciente
//localhost:4000/patient/getAppointmentHistory/:user_id  
router.get("/getConfirmedAppointments/:user_id", patientController.getConfirmedAppointments);


module.exports = router;
