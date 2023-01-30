var express = require('express');
const userControllers = require("../controllers/userControllers");
var router = express.Router();
const nodeMailerController = require("../services/nodeMailer");
// const verify = require("../middleware/verify");


//-------------------------------------------------------
//1.-login
//localhost:4000/user/login
router.post("/login", userControllers.login);

//-----------------------------------------------------
//2.-Borrado lógico de un usuario
//localhost:4000/user/deleteUser/:user_id      
router.put("/deleteUser/:user_id", userControllers.deleteUser);

//-----------------------------------------------------
//3.-Trae información de un usuario
//localhost:4000/user/oneUser/:user_id      
router.get("/oneUser/:user_id", userControllers.selectOneUser);

//-----------------------------------------------------
//4.-Cambio de contraseña en cualquier tipo de usuario
//localhost:4000/user/changeUserPassword/:user_id      
router.put("/changeUserPassword/:user_id", userControllers.changeUserPassword);

//-----------------------------------------------------
//5.-Solicitud reseteo de contraseña
//localhost:4000/user/resetPassword
router.put("/resetPassword", userControllers.resetPassword);

//5.1.-Envio de email con nueva contraseña
//localhost:4000/user/sendEmailResetPassword
router.post("/sendEmailResetPassword", nodeMailerController.sendResetPassword);

module.exports = router;
