var express = require('express');
const appointmentControllers = require("../controllers/appointmentControllers");
const nodeMailerController = require("../services/nodeMailer");

var router = express.Router();
//-----------------------------------------------------
//1.- Traer informacion de la busqueda de medicos
//localhost:4000/appointment/getInfoAvailableMedic
router.post("/getInfoAvailableMedic",appointmentControllers.getInfoAvailableMedic)
module.exports = router;

//2.-Trae disponibilidad de un médico
//localhost:4000/appointment/:medic_id/:day_id
router.get("/:medic_id/:day_id/:date", appointmentControllers.availabilityMedic);

//3.-Inserta cita
//localhost:4000/appointment/
router.post("/", appointmentControllers.addAppointment);

//3.1 - Envia email al médico cuando cogen una cita
//localhost:4000/appointment/newAppointment
router.post("/newAppointment", nodeMailerController.sendEmailAppointment);