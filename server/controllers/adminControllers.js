const connection = require("../config/db");
const { cleanObject } = require("../utils/cleanObject");

class adminControllers {
  // 1.- Trae todos los datos de todos los médicos
  // localhost:4000/admin/getAllMedics
  getAllMedics = (req, res) => {
    let sql =
      "SELECT user.*, medic_data.*, province_name, city.city_name FROM user LEFT JOIN medic_data ON user.user_id = medic_data.user_id  LEFT JOIN title ON user.user_id = title.user_id JOIN province ON user.province_id = province.province_id JOIN city ON user.city_id = city.city_id AND province.province_id = city.province_id WHERE user.type = 2 GROUP BY user.user_id ORDER BY user.lastname";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 2.- Trae los datos de todos los pacientes con ciudad y provincia
  // localhost:4000/admin/getAllPatients
  getAllPatients = (req, res) => {
    let sql =
      "SELECT user.*, province.province_name, city.city_name FROM user, province, city WHERE user.city_id = city.city_id AND user.province_id = province.province_id AND province.province_id = city.province_id AND user.type = 3 ORDER BY user.lastname";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 3.- Habilita un usuario
  // localhost:4000/admin/enableUser/:user_id
  enableUser = (req, res) => {
    let { user_id } = req.params;

    let sql = `UPDATE user SET is_deleted = 0 WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //4.- Activa un médico
  //localhost:4000/admin/enableMedic/:user_id
  enableMedic = (req, res) => {
    let { user_id } = req.params;

    let sql = `UPDATE medic_data SET medic_enabled = 1 WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //5.-Desactiva un médico
  //localhost:4000/admin/disableMedic/:user_id
  disableMedic = (req, res) => {
    let { user_id } = req.params;

    let sql = `UPDATE medic_data SET medic_enabled = 0 WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 6.- Trae los médicos que están pendiente de validar
  // localhost:4000/admin/getAllMedicsValidation
  getAllMedicsValidation = (req, res) => {
    let sql =
      "SELECT user.*, medic_data.*, province_name, city.city_name FROM user LEFT JOIN medic_data ON user.user_id = medic_data.user_id  LEFT JOIN title ON user.user_id = title.user_id JOIN province ON user.province_id = province.province_id JOIN city ON user.city_id = city.city_id AND province.province_id = city.province_id WHERE user.type = 2 AND medic_data.medic_enabled = 0 AND user.is_deleted = 0  GROUP BY user.user_id ORDER BY user.lastname";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //7.- Pone un médico en estado disponible
  //localhost:4000/admin/offVacation/:user_id
  offVacation = (req, res) => {
    let { user_id } = req.params;

    let sql = `UPDATE medic_data SET medic_is_on_vacation = 0 WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //8.-Pone un médico en estado no disponible
  //localhost:4000/admin/onVacation/:user_id
  onVacation = (req, res) => {
    let { user_id } = req.params;

    let sql = `UPDATE medic_data SET medic_is_on_vacation = 1 WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //9.- Trae la información de un médico
  //localhost:4000/admin/medicProfile/:user_id
  getMedicProfile = (req, res) => {
    const user_id = req.params.user_id;
    let sql = `SELECT * FROM user 
    LEFT JOIN  medic_data ON user.user_id = medic_data.user_id 
    LEFT JOIN title ON user.user_id = title.user_id 
    LEFT JOIN medic_data_speciality ON user.user_id = medic_data_speciality.user_id 
    LEFT JOIN speciality ON medic_data_speciality.speciality_id = speciality.speciality_id 
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
            medic_enabled: x.medic_enabled,
            is_deleted: x.is_deleted,
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

  //10.- Trae la información de un paciente
  //localhost:4000/admin/patientProfile/:user_id
  getPatientProfile = (req, res) => {
    const user_id = req.params.user_id;

    let sql = `SELECT user.*, province.province_name, city.city_name FROM user, province, city WHERE user.city_id = city.city_id AND user.province_id = province.province_id AND province.province_id = city.province_id AND user.user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //11./Crea una nueva especialidad
  //localhost:4000/admin/createSpeciality
  createSpeciality = (req, res) => {
    let speciality_name = req.body;

    let sql = `INSERT INTO speciality 
        (speciality_name) 
        VALUES ('${speciality_name}')`;
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({ error }) : res.status(200).json(result);
        });
      };

    //12.-Trae todas las especialidades
    getAllSpeciality = (req, res) => {
      let sql = "SELECT * FROM speciality";
      connection.query(sql, (error, result) => {
        error ? res.status(400).json({ error }) : res.status(200).json(result);
      });
    };
}

module.exports = new adminControllers();
