var express = require('express');
const appointmentControllers = require("../controllers/appointmentControllers");
var router = express.Router();
//-----------------------------------------------------
//1.- Traer informacion de la busqueda de medicos
//localhost:4000/appointment/getInfoAvailableMedic
router.post("/getInfoAvailableMedic",appointmentControllers.getInfoAvailableMedic)
module.exports = router;