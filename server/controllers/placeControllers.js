const connection = require("../config/db");
require("dotenv").config();

class placeControllers{

    //1.Traer la informacion tanto de ciudades como provincias
    //localhost:4000/place/getPlaces
    getPlaces = (req,res) => {
        let sql = 'select * from city left join province on province.province_id = city.province_id';

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({ error }) : res.status(200).json(result);
            console.log(result);
          });
    }

    

}
module.exports = new placeControllers();