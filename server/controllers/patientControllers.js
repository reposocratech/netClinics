const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class patientController {

  //1.Crear paciente
  //localhost:4000/patient/createPatient
  createPatient = (req, res) => {
   
    const { name, email, password, lastname,address,phone_number,dni } = req.body;
       
    let saltRounds = 8;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sql = `INSERT INTO user (name, lastname, phone_number, address, email, password, dni) VALUES ( '${name}','${lastname}', '${phone_number}', '${address}', '${email}', '${hash}', '${dni}')`;

        connection.query(sql, (error, result) => {
          console.log(error);
          error
            ? res.status(400).json({ error })
            : res.status(200).json(result);
        });
      });
    });
  };


  
  
  
  //---------------------------------------------------
  //3.- Trae la información de un paciente
  //localhost:4000/patient/onePatient/:user_id  
  
  selectOnePatient = (req, res) => {
    const user_id = req.params.user_id;

    let sqlPatient = `SELECT * FROM user WHERE user_id = ${user_id} and is_deleted = 0`;
    let sqlAppointment = `SELECT * FROM appointment WHERE user_id = ${user_id} and is_deleted = 0`;
    connection.query(sqlPatient, (error, resultPatient) => {
      if (error) {
        res.status(400).json({ error });
      }
      connection.query(sqlAppointment, (error2, resultAppointment) => {
        if (error2) {
          res.status(400).json({ error2 });
        }
        res.status(200).json({ resultPatient, resultAppointment });
      });
    });
  };
  //---------------------------------------------------
  // 4.- Trae todos los pacientes de la tabla user
  //localhost:4000/patient/all 
  getAllMedics = (req, res) => {
    
    console.log("headerrresssdasdasda",req.headers.authorization);
    

    let sql = `select user.* from user where user.type = 2 and user.is_deleted = 0 `;

    
    
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

//-----------------------------------------------------
/// 5.- Editar un usuario
//localhost:4000/users/editUser/:userId
editPatient = (req, res) => {
  let user_id = req.params.user_id;
  console.log("esteeee eeesss ellll user_id", user_id) ;
  console.log(JSON.parse(req.body.register))
  
  const {name, email, lastname,address,phone_number,dni} = JSON.parse(
    req.body.register);

  // const { name, lastname, phone, address, email } = req.body;

  let img = "";
  // let sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", phone = "${phone}", address = "${address}",email = "${email}" WHERE user_id = "${user_id}"`;

  if (req.file != undefined) {
    img = req.file.filename;
  }
  console.log("*****imagen******",img);
  let sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", phone_number = "${phone_number}", address = "${address}",email = "${email}", avatar = "${img}", dni = ${dni} WHERE user_id = "${user_id}"`;

  connection.query(sql, (error, result) => {
    if (error) throw error;
    error ? res.status(400).json({ error }) : res.status(200).json(result);
  });
};


 


  

}

module.exports = new userController();
