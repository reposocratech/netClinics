const connection = require("../config/db");
class appointmentControllers {


    //1.Traer informacion de la busqueda de medicos
    //localhost:4000/appointment/getInfoAvailableMedic
    getInfoAvailableMedic= (req, res) => {
        
        let {province_id,city_id,speciality_id,name }= req.body;

        province_id = parseInt(province_id);
        city_id = parseInt(city_id);
        speciality_id = parseInt(speciality_id);
       
        let sql = `SELECT medic_city.province_id, medic_city.city_id, user.name, user.lastname, user.   avatar, medic_data.medic_membership_number, medic_data_speciality.speciality_id, medic_data.user_id as medic from user 
        join medic_data on user.user_id = medic_data.user_id 
        join medic_data_speciality on user.user_id = medic_data_speciality.user_id
        join medic_city on medic_city.user_id = medic_data.user_id
        WHERE medic_city.province_id = ${province_id} and medic_city.city_id = ${city_id} and medic_data_speciality.speciality_id = ${speciality_id} and user.is_deleted = 0 and medic_data.medic_enabled = 1 and medic_data.medic_is_on_vacation = 0`;

        if (name != undefined ) {

            sql = `SELECT medic_city.province_id, medic_city.city_id, user.name, user.lastname, user.   avatar, medic_data.medic_membership_number, medic_data_speciality.speciality_id, medic_data.user_id as medic from user 
            join medic_data on user.user_id = medic_data.user_id 
            join medic_data_speciality on user.user_id = medic_data_speciality.user_id
            join medic_city on medic_city.user_id = medic_data.user_id
            WHERE medic_city.province_id = ${province_id} and medic_city.city_id = ${city_id} and medic_data_speciality.speciality_id = ${speciality_id} and user.is_deleted = 0 and medic_data.medic_enabled = 1 and medic_data.medic_is_on_vacation = 0 and user.name like '${name}%'`;

        }

        connection.query(sql, (error, result) => {
            if (error) throw error;
            error ? res.status(400).json({ error }) : res.status(200).json(result);
        });
        
    }

    //2.-Trae disponibilidad de un médico
    //localhost:4000/appointment/:medic_id/:day_id
    availabilityMedic = (req, res) => {
        let {medic_id, day_id} = req.params;
        let {date} = req.body;

        let sql = `SELECT * FROM availability WHERE user_id = ${medic_id} AND day_id = ${day_id}`;

        connection.query(sql, (error, result) => {
           if(error){
            res.status(400).json({error});
           }
           else{
            res.status(200).json(result)
            // console.log(result);
           }
        });

    }

    //3.-Saca la lista de 

}

module.exports = new appointmentControllers();