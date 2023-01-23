const connection = require("../config/db");
class specialityControllers {


    //1.Traer informacion de todas las especialidades
    //localhost:4000/speciality/getAllSpecialities
    getAllSpecialities = (req, res) => {
        let sql = `SELECT * FROM speciality ORDER BY speciality_id`;

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({ error }) : res.status(200).json(result);
            console.log(result);
        });
       

    }
    //2.Traer la informacion de las especialidades de un medico concreto
    //localhost:4000/speciality/getSpecialitiesOneMedic/:user_id
    getSpecialitiesOneMedic = (req, res) => {
        let {user_id} = req.params;
       
        let sql = `SELECT speciality_name FROM speciality join medic_data_speciality on speciality.speciality_id = medic_data_speciality.speciality_id WHERE medic_data_speciality.user_id = ${user_id}`;
  
        connection.query(sql, (error, result) => {
           if(error){
            res.status(400).json(error);
           }
           else{
            res.status(200).json(result);
            console.log(result);
            

           }
        });

    }
}
module.exports = new specialityControllers();