var express = require("express");
var router = express.Router();
var adminControllers = require("../controllers/adminControllers");

//1.- trae los datos de todos los médicos
//localhost:4000/admin/getAllMedics
//------------------------------------------
router.get("/getAllMedics", adminControllers.getAllMedics);

//2.- trae los datos de todos los pacientes
//localhost:4000/admin/getAllPatients
//------------------------------------------
router.get("/getAllPatients", adminControllers.getAllPatients);

//3.- deshabilita un usuario
//localhost:4000/admin/desableUser/:user_id
//--------------------------------------------
router.put("/desableUser/:user_id", adminControllers.desableUser);

//4.- habilita un usuario
//localhost:4000/admin/enableUser/:user_id
//--------------------------------------------
router.put("/enableUser/:user_id", adminControllers.enableUser);










module.exports = router;