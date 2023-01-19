var express = require('express');
const userControllers = require("../controllers/userControllers");
var router = express.Router();
const multerSingleImage = require("../middleware/multerSingleImage");
// const verify = require("../middleware/verify");


//-------------------------------------------------------
//1.-login
//localhost:4000/user/login
router.post("/login", userControllers.login);


//-----------------------------------------------------
//2.-Borrado lógico de un usuario
//localhost:4000/user/deleteUser/:userId       
router.put("/deleteUser/:user_id", userControllers.deleteUser);

//-----------------------------------------------------
//2.-Trae información de un usuario
//localhost:4000/user/oneUser/:userId       
router.get("/oneUser/:user_id", userControllers.selectOneUser);


module.exports = router;
