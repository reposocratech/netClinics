const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userControllers {
  //1.-login
  //localhost:4000/user/login
  login = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email = '${email}'`;

    console.log(sql);

    connection.query(sql, (error, result) => {
      //En caso de error en la consulta
      if (error) return res.status(400).json(error);

      //En caso de no encontrar un user con ese mail
      if (!result || !result.length || result[0].is_deleted == 1) {
        res.status(401).json("Usuario no registrado");
      } else {
        //Cuando el mail sea correcto
        const [user] = result;
        const hash = user.password;

        //capturo el user_id
        const user_id = user.user_id;

        //comparamos las contraseñas
        bcrypt.compare(password, hash, (error, response) => {
          if (error){
            console.log(error);
          };
          //si las contraseñas coinciden
          if (response === true) {
            const token = jwt.sign(
              {
                user: {
                  user_id: user_id,
                  email: user.email,
                  name: user.name,
                  lastname: user.lastname,
                  type: user.type,
                  avatar: user.avatar,
                },
              },
              process.env.SECRET,
              { expiresIn: "10d" }
            );
            res.status(200).json({ token });
            //si las contraseñas no coinciden
          } else {
            res.status(401).json("Usuario y contraseña incorrectos");
          }
        });
      }
    });
  };

  //2.-Borrado lógico de un usuario
  //localhost:4000/user/deleteUser/:userId
  deleteUser = (req, res) => {

    let user_id = req.params.user_id;
    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = ${user_id}`;
    
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    }); 

  };
}

module.exports = new userControllers();
