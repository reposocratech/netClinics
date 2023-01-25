const connection = require("../config/db");
const { cleanObject } = require("../utils/cleanObject");

class adminControllers {
  // 1.- Trae todos los datos de todos los médicos
  // localhost:4000/admin/getAllMedics
  getAllMedics = (req, res) => {
    let sql =
      "SELECT user.*, medic_data.*, province_name, city.city_name FROM user left join medic_data on user.user_id = medic_data.user_id  left join title on user.user_id = title.user_id join province on user.province_id = province.province_id join city on user.city_id = city.city_id and province.province_id = city.province_id where user.type = 2 order by user.lastname";

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      }
      res.status(200).json(result);
    });
  };

  // 2.- Trae los datos de todos los pacientes con ciudad y provincia
  // localhost:4000/admin/getAllPatients
  getAllPatients = (req, res) => {
    let sql =
      "SELECT user.*, province.province_name, city.city_name from user, province, city where user.city_id = city.city_id and user.province_id = province.province_id and province.province_id = city.province_id and user.type = 3 order by user.lastname";
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
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
      "SELECT user.*, medic_data.*, province_name, city.city_name FROM user left join medic_data on user.user_id = medic_data.user_id  left join title on user.user_id = title.user_id join province on user.province_id = province.province_id join city on user.city_id = city.city_id and province.province_id = city.province_id where user.type = 2 and medic_data.medic_enabled = 0 order by user.lastname";

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
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
}

module.exports = new adminControllers();
