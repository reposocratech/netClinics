const connection = require("../config/db");
require("dotenv").config();

class titleControllers {
    //1.Traer la informacion de los titulos 
    //localhost:4000/title/getTitles
    getTitles = (req,res) => {
        let sql = 'select * from title';

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({ error }) : res.status(200).json(result);
            console.log(result);
          });
    }
}
module.exports = new titleControllers();