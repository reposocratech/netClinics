const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//requiero la función de limpieza de objetos para valores duplicados
const { cleanObject } = require("../utils/cleanObject");

class medicControllers {
  //------------------------------------------------------
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
      speciality_id,
    } = JSON.parse(req.body.regMedic);

    province_id = parseInt(province_id);
    city_id = parseInt(city_id);
    postal_code = parseInt(postal_code);
    speciality_id = parseInt(speciality_id);

    let documents = [""];

    if (req.files != undefined) {
      documents = req.files;

      let saltRounds = 8;

      bcrypt.genSalt(saltRounds, function (err, saltRounds) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          //insert en la tabla user
          let sql = `INSERT INTO user (name, lastname, address, 
                    phone_number, dni, email, postal_code, password, 
                    province_id, city_id, type) VALUES ('${name}', 
                    '${lastname}', '${address}', '${phone_number}', 
                    '${dni}', '${email}', ${postal_code}, '${hash}', 
                    ${province_id}, ${city_id}, 2)`;

          connection.query(sql, (error, result) => {
            if (error) {
              res.status(400).json(error);
            } else {
              let id_user = result.insertId;

              //inserto en la tabla medic_data
              let sql2 = `INSERT INTO medic_data (user_id, medic_membership_number) 
              VALUES (${id_user}, '${medic_membership_number}')`;

              connection.query(sql2, (err, result) => {
                if (err) {
                  res.status(500).json("Ha habido un error");
                } else {
                  let sql = `INSERT INTO medic_city VALUES(${id_user}, ${province_id}, ${city_id})`;
                  connection.query(sql, (error, result) => {
                    if (error) {
                      res.status(500).json("Ha habido un error");
                    } else {
                      let sql = `INSERT INTO medic_data_speciality VALUES(${speciality_id}, ${id_user})`;
                      connection.query(sql, (error, result) => {
                        if (error) {
                          res.status(500).json("Ha habido un error");
                        } else {
                          documents.forEach((document) => {
                            //hago una insert de cada documento
                            let sql = `INSERT INTO title (document, user_id) 
                              VALUES ('${document.filename}', ${id_user})`;

                            connection.query(sql, (error, result) => {
                              if (error) {
                                res.status(500).json("Ha habido un error");
                              }
                            });
                          });
                        }
                      });
                    }
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
  //localhost:4000/medic/profile
  selectOneMedic = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {
      user: { user_id },
    } = jwt.decode(token);

    let sql = `SELECT * FROM user 
    left join medic_data on user.user_id = medic_data.user_id 
    left join title on user.user_id = title.user_id 
    left join medic_data_speciality on user.user_id = medic_data_speciality.user_id 
    left join speciality on medic_data_speciality.speciality_id = speciality.speciality_id 
    WHERE user.user_id=${user_id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        let finalResult = {};

        let groupTitles = [];
        let title = {};

        let groupSpecialities = [];
        let speciality = {};

        let groupUser = [];
        let user = {};

        //recorro el resultado de la query y añado los titulos
        //y especialidades del medico
        result.forEach((x) => {
          user = {
            user_id: user_id,
            name: x.name,
            lastname: x.lastname,
            address: x.address,
            phone_number: x.phone_number,
            dni: x.dni,
            email: x.email,
            postal_code: x.postal_code,
            avatar: x.avatar,
            city_id: x.city_id,
            province_id: x.province_id,
            medic_description: x.medic_description,
            medic_membership_number: x.medic_membership_number,
            medic_price: x.medic_price,
            medic_is_on_vacation: x.medic_is_on_vacation,
          };

          title = {
            title_id: x.title_id,
            text: x.text,
            university: x.university,
            document: x.document,
            start_date: x.start_date,
            end_date: x.end_date,
          };

          speciality = {
            speciality_name: x.speciality_name,
            speciality_id: x.speciality_id,
          };

          if (user.user_id != null) {
            groupUser.push(user);
          }

          if (title.title_id != null) {
            groupTitles.push(title);
          }

          if (speciality.speciality_id != null) {
            groupSpecialities.push(speciality);
          }
        });

        //limpio con la función cleanObject los id duplicados de titulos y
        //especialidades
        const uniqueUser = cleanObject(groupUser, "user_id");
        const uniqueTitles = cleanObject(groupTitles, "title_id");
        const uniqueSpecialities = cleanObject(
          groupSpecialities,
          "speciality_id"
        );

        //creo el resultado final
        finalResult = {
          user: uniqueUser,
          titles: uniqueTitles,
          specialities: uniqueSpecialities,
        };

        res.status(200).json(finalResult);
      }
    });
  };

  //3.-Trae la informacion de su  disponibilidad
  //localhost:4000/medic/getAvailability/:user_id
  getAvailability = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {
      user: { user_id },
    } = jwt.decode(token);

    let sql = `SELECT a.daily_hours_id, a.day_id, a.user_id, day_name, daily_hours_time FROM availability a
    left join day on a.day_id = day.day_id
    left join daily_hours on daily_hours.daily_hours_id = a.daily_hours_id  
    WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json("Ha habido un error");
      } else {
        res.status(200).json(result);
      }
    });
  };

  //4.-Editar un medico
  //localhost:4000/medic/editMedic/:user_id
  editMedic = (req, res) => {
    let { user_id } = req.params;

    let {
      name,
      email,
      lastname,
      address,
      phone_number,
      dni,
      province_id,
      city_id,
      postal_code,
      medic_description,
      medic_price,
    } = JSON.parse(req.body.editMedic);

    province_id = parseInt(province_id);
    city_id = parseInt(city_id);
    postal_code = parseInt(postal_code);
    medic_price = isNaN(parseInt(medic_price)) ? 0 : parseInt(medic_price);

    let img = "";
    let sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", phone_number = "${phone_number}", address = "${address}",email = "${email}", dni = "${dni}", province_id= ${province_id}, city_id= ${city_id}, postal_code= ${postal_code} WHERE user_id = "${user_id}"`;

    if (req.file != undefined) {
      img = req.file.filename;

      sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", phone_number = "${phone_number}", address = "${address}",email = "${email}", avatar = "${img}", dni = "${dni}", province_id= ${province_id}, city_id= ${city_id}, postal_code= ${postal_code} WHERE user_id = "${user_id}"`;
    }

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        let sql2 = `UPDATE medic_data SET medic_description = '${medic_description}', medic_price = ${medic_price} WHERE user_id = ${user_id}`;

        connection.query(sql2, (error, result) => {
          if (error) {
            res.status(400).json({ error });
          }
        });

        res.status(200).json({ updateProfile: true });
      }
    });
  };

  //5.- Trae todas las citas realizadas de un medico
  //localhost:4000/medic/getAppointmentHistory/:user_id
  getAppointmentHistory = (req, res) => {

    let {user_id} = req.params;
    let sql = `SELECT appointment.*, user.address, user.name, user.lastname, user.avatar, user.phone_number, user.postal_code, user.address, city.city_name, province.province_name FROM appointment JOIN user ON appointment.user_patient_id = user.user_id  JOIN province ON province.province_id = user.province_id JOIN city ON city.city_id = user.city_id AND city.province_id = province.province_id WHERE appointment.user_medic_id = ${user_id} and  is_completed = 1 group by appointment.appointment_id order by appointment_date`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //6.- Trae todas las citas pendientes de confirmar de un medico
  //localhost:4000/medic/getPendingAppointments/:user_id
  getPendingAppointments = (req, res) => {

    let {user_id} = req.params;
    let sql = `SELECT appointment.*, user.name, user.lastname, user.avatar, user.phone_number,user.postal_code, user.address, city.city_name, province.province_name FROM appointment

    JOIN user ON appointment.user_patient_id = user.user_id 
    JOIN province ON province.province_id = user.province_id
    JOIN city ON city.city_id = user.city_id AND city.province_id = province.province_id
    WHERE appointment.user_medic_id = ${user_id} and  is_completed = 0 and appointment_is_confirmed = 0 group by appointment.appointment_id order by appointment_date`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //7.- Trae todas las citas proximas (solo confirmadas) de un medico
  //localhost:4000/medic/getConfirmedAppointments/:user_id
  getConfirmedAppointments = (req, res) => {

    let {user_id} = req.params;
    let sql = `SELECT appointment.*, user.name, user.lastname, user.avatar, user.phone_number, user.postal_code, user.address, city.city_name, province.province_name FROM appointment

    JOIN user ON appointment.user_patient_id = user.user_id 
    JOIN province ON province.province_id = user.province_id
    JOIN city ON city.city_id = user.city_id AND city.province_id = province.province_id
    WHERE appointment.user_medic_id = ${user_id} and  is_completed = 0 and appointment_is_confirmed = 1 group by appointment.appointment_id order by appointment_date`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //8.- Agregar disponibilidad, horas y dias semana a un médico
  //localhost:4000/medic/availabilities
  addAvailability = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {
      user: { user_id },
    } = jwt.decode(token);

    let { daily_hours_id, day_id } = req.body;

    daily_hours_id = parseInt(daily_hours_id);
    day_id = parseInt(day_id);

    let sql1 = `SELECT * FROM availability WHERE user_id = ${user_id} 
    AND daily_hours_id = ${daily_hours_id} AND day_id = ${day_id}`;

    let sql2 = `INSERT INTO availability VALUES (${daily_hours_id}, ${day_id}, ${user_id})`;

    let sql3 = `DELETE FROM availability WHERE daily_hours_id=${daily_hours_id} AND day_id = ${day_id} AND user_id = ${user_id}`;

    connection.query(sql1, (error, result) => {
      if (error) {
        res.status(400).json("Ha habido un error");
      } else {
        if (!result.length) {
          connection.query(sql2, (error, result) => {
            if (error) {
              res.status(400).json("Ha habido un error");
            } else {
              res.status(200).json({ availability: true });
            }
          });
        } else {
          connection.query(sql3, (error, result) => {
            if (error) {
              res.status(400).json("Ha habido un error");
            } else {
              res.status(200).json({ availability: false });
            }
          });
        }
      }
    });
  };

  //9.- Trae las provincias y ciudades donde presta servicios el médico
  //localhost:4000/medic/providerServices/:user_id
  providerServices = (req, res) => {
    let { user_id } = req.params;

    let sql = `select medic_city.province_id, province.province_name, city.city_name, medic_city.city_id 
    from medic_city, city, province
    where medic_city.city_id = city.city_id
    and medic_city.province_id = province.province_id
    and city.province_id = province.province_id and user_id=${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //------------------------------------------------------
  //10.- Inserta provincia y ciudad donde quiera prestar servicio el médico
  //localhost:4000/medic/providerServices/:user_id
  providerServicesAdd = (req, res) => {
    let { user_id } = req.params;

    let { province_id, city_id } = req.body;

    province_id = parseInt(province_id);
    city_id = parseInt(city_id);

    let sql = `INSERT INTO medic_city VALUES (${user_id}, ${province_id}, ${city_id})`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //------------------------------------------------------
  //11.- Elimina una provincia y ciudad donde preste servicio un médico
  //localhost:4000/medic/providerServices/:user_id/:province_id/:city_id
  providerServicesDel = (req, res) => {
    let { user_id, province_id, city_id } = req.params;

    let sql = `DELETE FROM medic_city WHERE user_id = ${user_id} AND province_id = ${province_id} AND city_id = ${city_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //---------------------------------------------------
  // 12.- Trae la info de todos los pacientes (sus nombres)
  //localhost:4000/medic/getPatientsName
  getPatientsName = (req, res) => {
    let sql = `select * from user where user.type = 3 and user.is_deleted = 0  `;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //13.- El medico cancela una proxima cita que todavia no esta confirmada
  //localhost:4000/medic/cancelPendingAppointment/:appointment_id
  cancelPendingAppointment = (req, res) => {
    let { appointment_id } = req.params;
    let sql = `DELETE FROM appointment where appointment_id = ${appointment_id}`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

  //14.- El medico acepta una proxima cita que todavia no estaba confirmada
  //localhost:4000/patient/acceptPendingAppointment/:appointment_id
  acceptPendingAppointment = (req, res) => {
    let { appointment_id } = req.params;
    let sql = `UPDATE appointment SET appointment_is_confirmed = 1 WHERE appointment_id = ${appointment_id}`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

  
  //15.- El medico completa una proxima cita 
  //localhost:4000/patient/completeAppointment/:appointment_id
  completeAppointment = (req, res) => {
    let { appointment_id } = req.params;
    let sql = `UPDATE appointment SET is_completed = 1 WHERE appointment_id = ${appointment_id}`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };
}

module.exports = new medicControllers();
