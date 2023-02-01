const connection = require("../config/db");
class specialityControllers {
  //1.Traer informacion de todas las especialidades
  //localhost:4000/speciality/getAllSpecialities
  getAllSpecialities = (req, res) => {
    let sql = `SELECT * FROM speciality ORDER BY speciality_id`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
  //2.Traer la informacion de las especialidades de un medico concreto
  //localhost:4000/speciality/getSpecialitiesOneMedic/:user_id
  getSpecialitiesOneMedic = (req, res) => {
    let { user_id } = req.params;

    let sql = `SELECT speciality_name FROM speciality join medic_data_speciality on speciality.speciality_id = medic_data_speciality.speciality_id WHERE medic_data_speciality.user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //3.Añadir especialidad a un médico concreto
  //localhost:4000/speciality/:user_id
  addSpeciality = (req, res) => {
    let { user_id } = req.params;
    const speciality_id = parseInt(req.body.speciality_id);

    let sql = `INSERT INTO medic_data_speciality VALUES (${speciality_id}, ${user_id})`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //4.Borrar especialidad concreta a un médico concreto
  //localhost:4000/speciality/:speciality_id/:user_id
  deleteSpeciality = (req, res) => {
    let { speciality_id, user_id } = req.params;

    let sql = `DELETE FROM medic_data_speciality WHERE speciality_id = ${speciality_id} AND user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //5.Borrar especialidad concreta a un médico concreto
  //localhost:4000/speciality/:speciality_id
  deleteSpecialityAdmin = (req, res) => {
    let { speciality_id } = req.params;

    let sql = `DELETE FROM speciality WHERE speciality_id = ${speciality_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //6.Editar una especialidad administrador
  //localhost:4000/speciality/:speciality_id
  editSpecialityAdmin = (req, res) => {
    let {speciality_id} = req.params;
    let {speciality_name} = req.body;

    let sql = `UPDATE speciality SET speciality_name = '${speciality_name}' WHERE speciality_id = ${speciality_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });

  }

}
module.exports = new specialityControllers();
