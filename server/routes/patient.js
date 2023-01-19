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
//3.-Trae la informacion de la busqueda de los medicos
//localhost:4000/patient/getMedics 
router.get("/getMedics", patientController.getAllMedics);

//----------------------------------------------------------------
//4.-Trae la información de un usuario para modificarla
//localhost:4000/patient/getEditPatient/:user_id  
router.get("/getEditPatient/:user_id", patientController.getEditPatient);

//-----------------------------------------------------
//5.-Editar un usuario 
//localhost:4000/patient/editPatient/:user_id       
router.put("/editPatient/:user_id", multerSingleImage("user"), patientController.editPatient);


module.exports = router;
