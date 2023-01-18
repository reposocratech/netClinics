const connection = require('../config/db')

class adminControllers {

// 1.- Trae todos los datos de todos los médicos
// localhost:4000/admin/getAllMedics

getAllMedics = (req, res) => {
    let sql = "SELECT * FROM user WHERE type = 2"
    connection.query(sql, (error, result) => {
        if(error){
            res.status(400).json({error});
        }
        res.status(200).json(result);
    })
}

// 2.- Trae los datos de todos los pacientes
// localhost:4000/admin/getAllPatients

getAllPatients = (req, res) => {
    let sql = "SELECT * FROM user WHERE type = 3"
    connection.query(sql, (error, res) => {
        if(error){
            res.status(400).json({error});
        }
        res.status(200).json(res);
    })
}

// 3.- Deshabilita un usuario
// localhost:4000/admin/desableUser/:user_id

desableUser = (req, res) => {
    console.log(req.params);
    
    let {id} = req.params;
    console.log("Este es el ID del User:", id);
    let sql = `UPDATE user SET is_deleted user_id = "${id}"`;
    let sql2 = 'SELECT * FROM user';

    connection.query(sql, (error, res) => {
        if(error) throw error;
        console.log(error);
    });

    connection.query(sql2, (error, res) => {
        error ? res.status(400).json({ error }) : res.status(200).json(resultUser);
    });    
}

// 4.- Habilita un usuario
// localhost:4000/admin/enableUser/:user_id

enableUser = (req, res) => {
    console.log("Esto es el controlador de Habilitar:", req.params);

    let {id} = req.params;
    console.log(id);
    let sql = `UPDATE user SET is_deleted = 0 WHERE user_id = "${id}"`;
    let sql2 = 'SELECT * FROM user';

    connection.query(sql, (error, res) => {
        if(error) throw error;
        console.log(error);
    });

    connection.query(sql2, (error, resUser) => {
        error ? res.status(400).json({ error }) : res.status(200).json(resultUser);
    })
}
}

module.exports = new adminControllers();