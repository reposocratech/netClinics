var express = require('express');
const titleControllers = require("../controllers/titleControllers");
var router = express.Router();
const multerFiles = require("../middleware/multerFiles");

//------------------------------------------------------
//1.-Trae la información de las ciudades
//localhost:4000/title/getTitles
router.get("/getTitles", titleControllers.getTitles);

//2.-Editar Titulo
//localhost:4000/title/:title_id
router.put("/:title_id", multerFiles("titles"), titleControllers.editTitle);

//3.-Borrar Título
//localhost:4000/title/:title_id
router.delete("/:title_id", titleControllers.deleteTitle);

//4.-Añadir titulo
//localhost:4000/title
router.post("/:user_id", multerFiles("titles"), titleControllers.addTittle);


module.exports = router;