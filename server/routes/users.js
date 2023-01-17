var express = require('express');
const userControllers = require("../controllers/userControllers");
var router = express.Router();
const multerSingleImage = require("../middleware/multerSingleImage");
// const verify = require("../middleware/verify");


//-------------------------------------------------------
//1.-login
//localhost:4000/users/login
router.post("/login", userControllers.login);


//-----------------------------------------------------
//2.-Borrado lógico de un usuario
//localhost:4000/users/deleteUser/:userId       
router.delete("/deleteUser/:user_id", userControllers.deleteUser);


module.exports = router;
