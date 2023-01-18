var express = require('express');
const placeControllers = require("../controllers/placeControllers");
var router = express.Router();

//------------------------------------------------------
//1.-Trae la información de las ciudades
//localhost:4000/place/getPlaces
router.get("/getPlaces", placeControllers.getPlaces);



module.exports = router;