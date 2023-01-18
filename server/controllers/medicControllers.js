const connection = require('../config/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class medicControllers {
  
  //1.- createMedic
  //localhost:4000/medic/createMedic
  
  createMedic = (req, res) => {
    //table user, table medic_data, table title
    let {
      name,
      lastname,
      address,
      phone_number,
      dni,
      email,
      postal_code,
      password,
      province_id,
      city_id,
      medic_membership_number,
    } = req.body;

    province_id = parseInt(province_id);
    city_id = parseInt(city_id);
    postal_code = parseInt(postal_code);

    let documents = [""];

    if (req.files != undefined) {
      documents = req.files;

      let saltRounds = 8;
      
      bcrypt.genSalt(saltRounds, function (err, saltRounds) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          //insert en la tabla user
          let sql = `INSERT INTO user (name, lastname, address, 
                    phone_number, dni, email, postal_code, password, province_id, 
                    city_id, type) VALUES ('${name}', '${lastname}', '${address}', '${phone_number}', '${dni}', '${email}', ${postal_code}, '${hash}', ${province_id}, ${city_id}, 2)`;

          connection.query(sql, (error, result) => {
            if (error) {
              console.log(error);
              res.status(500).json("Ha habido un error");
            } else {
              let id_user = result.insertId;

              //inserto en la tabla medic_data
              let sql2 = `INSERT INTO medic_data (user_id, medic_membership_number) VALUES (${id_user}, '${medic_membership_number}')`;

              connection.query(sql2, (err, result) => {
                if (err) {
                  res.status(500).json("Ha habido un error");
                } else {
                  documents.forEach((document) => {
                    //hago una insert de cada documento
                    let sql = `INSERT INTO title (document, user_id) VALUES ('${document.filename}', ${id_user})`;

                    connection.query(sql, (error, result) => {
                      if (error) {
                        console.log(error);
                      }
                    });
                  });
                }
              });
              res.status(200).json(result);
            }
          });
        });
      });
    } else {
      res.status(500).json("Ha habido un error");
    }
  };

  //------------------------------------------------------
  //2.-Trae la información de un medico
  //localhost:4000/medic/oneMedic/:user_id

  selectOneMedic = (req, res) => {
    let {user_id} = req.params;

    let sql = `SELECT * FROM user left join medic_data on user.user_id = medic_data.user_id left join title on user.user_id = title.user_id WHERE user.user_id=${user_id}`;

    connection.query(sql, (error, result) => {
      if(error){
        res.status(400).json(error);
      }
      else{
        let finalResult = {};
        let groupTitles = [];
        let title = {};

        result.forEach(x =>{
          title = {
              title_id: x.title_id,
              text: x.text,
              university: x.university,
              document: x.document,
              start_date: x.start_date,
              end_date: x.end_date,
          };

          if(title.title_id != null){
              groupTitles.push(title); 
          }
        });

        finalResult = {
          user_id: user_id,
          name: result[0].name,
          lastname: result[0].lastname,
          address: result[0].address,
          phone_number: result[0].phone_number,
          dni: result[0].dni,
          email: result[0].email,
          postal_code: result[0].postal_code,
          avatar: result[0].avatar,
          city_id: result[0].city_id,
          province_id: result[0].province_id,
          medic_description: result[0].medic_description,
          medic_membership_number: result[0].medic_membership_number,
          medic_price: result[0].medic_price,
          titles: groupTitles
        };

        res.status(200).json(finalResult);
      }

    });

  };

  //3.-Trae la informacion de su  disponibilidad
  //localhost:4000/medic/getAvailability/:user_id

  getAvailability = (req, res) => {};

  //4.-Editar un medico
  //localhost:4000/medic/editMedic/:user_id

  editMedic = (req, res) => {};


  //6.-Trae la información de un usuario para modificarla
  //localhost:4000/medic/getEditMedic/:user_id

  getEditOneMedic = (req, res) => {};

  //7.- Trae todas las citas realizadas de un medico
  //localhost:4000/medic/getAppointmentHistory/:user_id

  getAppointmentHistory = (req, res) => {};

  //8.- Trae todas las citas proximas (tanto confirmadas como pendientes de
  // confirmar) de un medico
  //localhost:4000/medic/getPendingAppointments/:user_id

  getPendingAppointments = (req, res) => {};

  //9.- Trae todas las citas proximas (solo confirmadas) de un medico
  //localhost:4000/medic/getConfirmedAppointments/:user_id

  getConfirmedAppointments = (req, res) => {};
}

module.exports = new medicControllers();
