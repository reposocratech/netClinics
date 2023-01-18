var express = require('express');
const titleControllers = require("../controllers/titleControllers");
var router = express.Router();

//------------------------------------------------------
//1.-Trae la información de las ciudades
//localhost:4000/title/getTitles
router.get("/getTitles", titleControllers.getTitles);



module.exports = router;