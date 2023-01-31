const connection = require("../config/db");
class appointmentControllers {
  //1.Traer informacion de la busqueda de medicos
  //localhost:4000/appointment/getInfoAvailableMedic
  getInfoAvailableMedic = (req, res) => {
    let { province_id, city_id, speciality_id, name } = req.body;

    province_id = parseInt(province_id);
    city_id = parseInt(city_id);
    speciality_id = parseInt(speciality_id);

    let sql = `SELECT medic_city.province_id, medic_city.city_id, user.name, user.lastname, user.avatar, user.email, medic_data.medic_price, medic_data.medic_membership_number, medic_data_speciality.speciality_id, medic_data.user_id AS medic FROM user 
        JOIN medic_data ON user.user_id = medic_data.user_id 
        JOIN medic_data_speciality ON user.user_id = medic_data_speciality.user_id
        JOIN medic_city ON medic_city.user_id = medic_data.user_id
        WHERE medic_city.province_id = ${province_id} AND medic_city.city_id = ${city_id} AND medic_data_speciality.speciality_id = ${speciality_id} AND user.is_deleted = 0 AND medic_data.medic_enabled = 1 AND medic_data.medic_is_on_vacation = 0 AND medic_data.medic_price <> 0`;

    if (name != undefined) {
      sql = `SELECT medic_city.province_id, medic_city.city_id, user.name, user.lastname, user.avatar, user.email, medic_data.medic_price, medic_data.medic_membership_number, medic_data_speciality.speciality_id, medic_data.user_id AS medic FROM user 
            JOIN medic_data ON user.user_id = medic_data.user_id 
            JOIN medic_data_speciality ON user.user_id = medic_data_speciality.user_id
            JOIN medic_city ON medic_city.user_id = medic_data.user_id
            WHERE medic_city.province_id = ${province_id} AND medic_city.city_id = ${city_id} AND medic_data_speciality.speciality_id = ${speciality_id} AND user.is_deleted = 0 AND medic_data.medic_enabled = 1 AND medic_data.medic_is_on_vacation = 0 AND user.name like '${name}%' AND medic_data.medic_price <> 0`;
    }

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //2.-Trae disponibilidad de un médico
  //localhost:4000/appointment/:medic_id/:day_id/:date
  availabilityMedic = (req, res) => {
    let { medic_id, day_id, date } = req.params;

    let sql = `SELECT * FROM availability 
        WHERE NOT EXISTS (SELECT * FROM appointment WHERE availability.day_id = appointment.day_id AND availability.daily_hours_id = appointment.daily_hours_id AND appointment.appointment_date = '${date}') AND availability.user_id = ${medic_id} AND availability.day_id = ${day_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //3.-Dar de alta una cita
  //localhost:4000/appointment
  addAppointment = (req, res) => {
    let {
      medic_id,
      patient_id,
      date,
      daily_hours_id,
      day_id,
      appointment_time,
      appointment_commentary,
    } = req.body;

    let sql = `INSERT INTO appointment 
        (appointment_commentary, appointment_date, appointment_time, user_patient_id, user_medic_id, daily_hours_id, day_id) 
        VALUES ('${appointment_commentary}', '${date}', '${appointment_time}', ${patient_id}, ${medic_id}, ${daily_hours_id}, ${day_id})`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new appointmentControllers();
