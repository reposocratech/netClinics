const connection = require("../config/db");
class appointmentControllers {


    //1.Traer informacion de la busqueda de medicos
    //localhost:4000/appointment/getInfoAvailableMedic
    getInfoAvailableMedic= (req, res) => {
        
        let {province_id,city_id,speciality_id,name }= req.body;

        province_id = parseInt(province_id);
        city_id = parseInt(city_id);
        speciality_id = parseInt(speciality_id);
        console.log(city_id);
        let sql = `SELECT user.province_id, user.city_id, user.name, user.lastname, user.avatar, medic_data.medic_membership_number, medic_data_speciality.speciality_id from user 
        join medic_data on user.user_id = medic_data.user_id 
        join medic_data_speciality on user.user_id = medic_data_speciality.user_id
        WHERE user.province_id = ${province_id} and user.city_id = ${city_id} and medic_data_speciality.speciality_id = ${speciality_id} and user.is_deleted = 0 and medic_data.medic_enabled = 1 and medic_data.medic_is_on_vacation = 0`;
        if (name != undefined ) {
            sql = `SELECT user.province_id, user.city_id, user.name, user.lastname, user.avatar, medic_data.medic_membership_number, medic_data_speciality.speciality_id from user 
            join medic_data on user.user_id = medic_data.user_id 
            join medic_data_speciality on user.user_id = medic_data_speciality.user_id
            WHERE user.province_id = ${province_id} and user.city_id = ${city_id} and medic_data_speciality.speciality_id = ${speciality_id} and user.name like '${name}%' and user.is_deleted = 0 and medic_data.medic_enabled = 1 and medic_data.medic_is_on_vacation = 0`
        }
        connection.query(sql, (error, result) => {
            if (error) throw error;
            error ? res.status(400).json({ error }) : res.status(200).json(result);
          });
        

    }
}
module.exports = new appointmentControllers();