const connection = require('../config/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class medicControllers {

    //1.- createMedic
    //localhost:4000/medic/createMedic

    createMedic = (req, res) => {
        
        const {name, lastname, dni, email, password, medic_membership_number} = req.body

        let saltRounds = 8;
        bcrypt.genSalt(saltRounds, function (err, saltRounds){
            bcrypt.hash(password, saltRounds, function (err, hash){
            
            })
        })

    }


}

module.exports = new medicControllers();