const connection = require("../config/db");
require("dotenv").config();

class timeControllers {

    //1.-Trae todos los dias de la semana
    //localhost:4000/time/getAllDays
    getAllDays = (req,res) => {
        let sql = 'select * from day';

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({ error }) : res.status(200).json(result);
            console.log(result);
          });
    }

    //2.-Trae todos las horas de un día
    //localhost:4000/time/getAllHours
    getAllHours = (req, res) => {
        
        let sql = 'select * from daily_hours';

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({ error }) : res.status(200).json(result);
            console.log(result);
        });
    }
}
module.exports = new timeControllers();