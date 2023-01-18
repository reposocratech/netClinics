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

getAllPatients = (req, res) => {
    let sql = "SELECT * FROM user WHERE type = 3"
    connection.query(sql, (error, result) => {
        if(error){
            res.status(400).json({error});
        }
        res.status(200).json(result);
    })
}

desableUser = (req, res) => {
    console.log(req.params);
    
    let {user_id} = req.params;
    console.log("Este es el ID del User:", user_id);
    
}


}

module.exports = new adminControllers();