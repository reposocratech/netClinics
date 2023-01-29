var express = require("express");
var router = express.Router();
var adminControllers = require("../controllers/adminControllers");
const nodeMailerController = require("../services/nodeMailer");

//1.- trae los datos de todos los médicos
//localhost:4000/admin/getAllMedics
//------------------------------------------
router.get("/getAllMedics", adminControllers.getAllMedics);

//2.- trae los datos de todos los pacientes
//localhost:4000/admin/getAllPatients
//------------------------------------------
router.get("/getAllPatients", adminControllers.getAllPatients);

//3.- habilita un usuario
//localhost:4000/admin/enableUser/:user_id
//--------------------------------------------
router.put("/enableUser/:user_id", adminControllers.enableUser);

//4.- Activa un médico
//localhost:4000/admin/enableMedic/:user_id
//--------------------------------------------
router.put("/enableMedic/:user_id", adminControllers.enableMedic);

//4.1- Envia email cuando se activa un médico
//localhost:4000/admin/enableMedicEmail
router.post("/enableMedicEmail", nodeMailerController.sendAvailabilityMedic);

//5.- Desactiva un medico
//localhost:4000/admin/disableMedic/:user_id
//--------------------------------------------
router.put("/disableMedic/:user_id", adminControllers.disableMedic);

//6.- Listado de médicos pendiente de validar
//localhost:4000/admin/getAllMedicsValidation
router.get("/getAllMedicsValidation", adminControllers.getAllMedicsValidation);

//7.- Activa un médico
router.put("/offVacation/:user_id", adminControllers.offVacation);

//8.- Desactiva un médico
router.put("/onVacation/:user_id", adminControllers.onVacation);

//9.- Trae la información de un médico
//localhost:4000/admin/medicProfile/:user_id
router.get("/medicProfile/:user_id", adminControllers.getMedicProfile);

//10.- Trae la información de un paciente
//localhost:4000/admin/patientProfile/:user_id
router.get("/patientProfile/:user_id", adminControllers.getPatientProfile);


module.exports = router;