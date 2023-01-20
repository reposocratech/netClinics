var express = require('express');
const timeControllers = require("../controllers/timeControllers");
var router = express.Router();

//------------------------------------------------------
//1.-Trae todos los dias de la semana
//localhost:4000/time/getAllDays
router.get("/getAllDays", timeControllers.getAllDays);

//------------------------------------------------------
//2.-Trae todos las horas de un día
//localhost:4000/time/getAllHours
router.get("/getAllHours", timeControllers.getAllHours);



module.exports = router;