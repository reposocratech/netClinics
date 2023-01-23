const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class patientControllers {

  //1.Crear paciente
  //localhost:4000/patient/createPatient
  createPatient = (req, res) => {
    console.log(req.body);
    let { name, email, password, lastname,address,phone_number,dni,province_id,city_id, postal_code} = req.body;

    province_id = parseInt(province_id);
    city_id = parseInt(city_id);
    postal_code = parseInt(postal_code);
     
    let saltRounds = 8;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sql = `INSERT INTO user (name, lastname, phone_number, address, email, password, dni, province_id, city_id, postal_code) VALUES ( '${name}','${lastname}', '${phone_number}', '${address}', '${email}', '${hash}', '${dni}', ${province_id}, ${city_id}, ${postal_code})`;

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
  //2.- Trae la información de un paciente
  //localhost:4000/patient/onePatient/:user_id  
  
  selectOnePatient = (req, res) => {
    const {user_id} = req.params;

    let sqlPatient = `SELECT * FROM user WHERE user_id = ${user_id} and is_deleted = 0`;
    let sqlAppointment = `SELECT * FROM appointment WHERE user_patient_id = ${user_id}`;
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
  // 3.- Trae todos los medicos de la tabla user
  //Esta ruta no la utilizamos
  //localhost:4000/patient/getMedics 
  getAllMedics = (req, res) => {
    
    

    let sql = `select user.* from user where user.type = 2 and user.is_deleted = 0 `;

    
    
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      
    });
  };

  //-----------------------------------------------
  // 4.- Trae la info de un paciente para editarlo
  //localhost:4000/patient/getEditPatient/:user_id

  getEditPatient = (req, res) => {
    
    let user_id = req.params.user_id;
    let sql = `SELECT * FROM user WHERE user_id = "${user_id}"`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      
    });
  };

//-----------------------------------------------------
/// 5.- Editar un paciente
//localhost:4000/patient/editPatient/:user_id
editPatient = (req, res) => {
  let user_id = req.params.user_id;

  let {name, email, lastname, address, phone_number, dni, province_id, city_id, postal_code, avatar} = JSON.parse(req.body.register);

  console.log("este es el avatar " , avatar);

  province_id = parseInt(province_id);
  city_id = parseInt(city_id);
  postal_code = parseInt(postal_code);
  

  let img = avatar;
  
  if (req.file != undefined) {
    img = req.file.filename;
  }

  let sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", phone_number = "${phone_number}", address = "${address}",email = "${email}", avatar = "${img}", dni = "${dni}", province_id= ${province_id}, city_id= ${city_id}, postal_code= ${postal_code} WHERE user_id = "${user_id}"`;

  console.log("consulta ", sql);

  connection.query(sql, (error, result) => {
    if (error) throw error;
    error ? res.status(400).json({ error }) : res.status(200).json(result);
  });
};





  

}

module.exports = new patientControllers();
