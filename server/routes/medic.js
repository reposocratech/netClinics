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
router.put("/editMedic/:user_id", multerSingleImage("user"), medicControllers.editMedic);

//------------------------------------------------------
//5.- Trae todas las citas realizadas de un medico
//localhost:4000/medic/getAppointmentHistory/:user_id 
router.get("/getAppointmentHistory/:user_id", medicControllers.getAppointmentHistory);

//------------------------------------------------------
//6.- Trae todas las citas pendientes de confirmar de un medico
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

//------------------------------------------------------
//9.- Trae las provincias y ciudades donde presta servicios el médico
//localhost:4000/medic/providerServices/:user_id
router.get("/providerServices/:user_id", medicControllers.providerServices);

//------------------------------------------------------
//10.- Inserta provincia y ciudad donde quiera prestar servicio el médico
//localhost:4000/medic/providerServices/:user_id
router.post("/providerServices/:user_id", medicControllers.providerServicesAdd);

//------------------------------------------------------
//11.- Elimina una provincia y ciudad donde preste servicio un médico
//localhost:4000/medic/providerServices/:user_id/:province_id/:city_id
router.delete("/providerServices/:user_id/:province_id/:city_id", medicControllers.providerServicesDel);

//------------------------------------------------------
//12.- Trae la info de todos los pacientes (sus nombres)
//localhost:4000/medic/getPatientsName
router.get("/getPatientsName", medicControllers.getPatientsName);

//------------------------------------------------------
//13.- El medico cancela una proxima cita que todavia no esta confirmada
//localhost:4000/medic/cancelPendingAppointment/:appointment_id
router.delete("/cancelPendingAppointment/:appointment_id", medicControllers.cancelPendingAppointment);

//------------------------------------------------------
//14.- El medico acepta una proxima cita que todavia no estaba confirmada
//localhost:4000/medic/acceptPendingAppointment/:appointment_id
router.put("/acceptPendingAppointment/:appointment_id", medicControllers.acceptPendingAppointment);


module.exports = router;