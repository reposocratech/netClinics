var express = require('express');
const placeControllers = require("../controllers/placeControllers");
var router = express.Router();

//------------------------------------------------------
//1.-Trae la información de las ciudades
//localhost:4000/place/getPlaces
router.get("/getPlaces", placeControllers.getPlaces);

//2.-Trae la información de la provincia y ciudad de un usuario
//localhost:4000/place/getPlaceOneUser/:user_id
router.get("/getPlaceOneUser/:user_id", placeControllers.getPlaceOneUser);

//3.-Trae la información de todas las provincias
//localhost:4000/place/getAllProvince/
router.get("/getAllProvince", placeControllers.getAllProvince);


//4.-Trae la información de todas las ciudades de un provincia
//localhost:4000/place/getAllCity/:province_id
router.get("/getAllCity/:province_id", placeControllers.getAllCity);


module.exports = router;