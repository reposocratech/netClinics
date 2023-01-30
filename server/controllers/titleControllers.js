const connection = require("../config/db");
require("dotenv").config();

class titleControllers {
    //1.Traer la informacion de los titulos 
    //localhost:4000/title/getTitles
    getTitles = (req,res) => {
        let sql = 'SELECT * FROM title';

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({ error }) : res.status(200).json(result);
          });
    }

    //2.Editar titulo
    //localhost:4000/title/:title_id
    editTitle = (req, res) => {

        let {title_id} = req.params;

        let {text, university, start_date, end_date, document} = JSON.parse(req.body.editTitle);

        let file = "";

        let sql = `UPDATE title SET text = '${text}', university = '${university}', start_date = '${start_date}', end_date = '${end_date}' WHERE title_id = ${title_id}`;

        if(req.files.length !== 0){

            file = req.files[0].filename;

            sql = `UPDATE title SET text = '${text}', university = '${university}', start_date = '${start_date}', end_date = '${end_date}', document = '${file}' WHERE title_id = ${title_id}`;

        };
        
        connection.query(sql, (error, result) => {
            error ? res.status(400).json({ error }) : res.status(200).json(result);
          });

    }

    //3.Borrar un título
    //localhost:4000/title/:title_id
    deleteTitle = (req, res) => {
        let {title_id} = req.params;

        let sql = `DELETE FROM title WHERE title_id = ${title_id}`;

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({ error }) : res.status(200).json(result);
        });


    }


    //4.Añadir un titulo
    //localhost:4000/title/:user_id
    addTittle = (req, res) => {
        let {user_id} = req.params;

        let {text, university, start_date, end_date} = JSON.parse(req.body.addTittle);

        let document = req.files[0].filename;

        let sql = `INSERT INTO title (text, university, document, start_date, end_date, user_id) VALUES('${text}', '${university}', '${document}', '${start_date}', '${end_date}', ${user_id})`;

        connection.query(sql, (error, result) => {
            error ? res.status(400).json({ error }) : res.status(200).json(result);
        })

    }
}
module.exports = new titleControllers();