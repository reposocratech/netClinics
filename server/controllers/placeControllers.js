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
    
    //4.Traer la informacion tanto de ciudades como provincias de un usuario concreto
    //localhost:4000/place/getPlaceOneUser/:user_id
    getPlaceOneUser = (req, res) => {
        let {user_id} = req.params;
       
        let sql = `SELECT province_id, city_id FROM user WHERE user_id = ${user_id}`;
  
        connection.query(sql, (error, result) => {
           if(error){
            res.status(400).json(error);
           }
           else{
            let {province_id, city_id} = result[0];

            let sql2 = `SELECT province.province_name, city.city_name from province, city where province.province_id = ${province_id} and city.city_id = ${city_id} and province.province_id = city.province_id;`

                connection.query(sql2, (error, result) => {
                    if(error){
                        res.status(400).json(error);
                    }
                    else{
                        res.status(200).json(result);
                    }
                });

           }
        });

    }

    //3.-Trae la información de todas las provincias
    //localhost:4000/place/getAllProvince/
    getAllProvince = (req, res) => {

        let sql = `SELECT * FROM province`;

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({ error }) : res.status(200).json(result);
            console.log(result);
        });


    }

    //4.-Trae la información de todas las ciudades de un provincia
    //localhost:4000/place/getAllCity/:province_id
    getAllCity = (req, res) => {
        
        let {province_id} = req.params

        let sql = `SELECT * FROM city where province_id = ${province_id}`;

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({ error }) : res.status(200).json(result);
            console.log(result);
        });

    }
    

}
module.exports = new placeControllers();