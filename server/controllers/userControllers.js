const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generatePasswordRand = require("../../../02-Clases Miriam/10-NodeJS/Proyectos/videogame-collectors/services/generatePassword");

class userControllers {
  //1.-login
  //localhost:4000/user/login
  login = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email = '${email}' AND is_deleted = 0`;

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
          if (error) {
            console.log(error);
          }
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
  //localhost:4000/user/deleteUser/:user_id
  deleteUser = (req, res) => {
    let user_id = req.params.user_id;
    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //-----------------------------------------------------
  //3.-Trae información de un usuario
  //localhost:4000/user/oneUser/:user_id
  selectOneUser = (req, res) => {
    let { user_id } = req.params;

    let sql = `SELECT * FROM user WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //-----------------------------------------------------
  //4.-Cambio de contraseña en cualquier tipo de usuario
  //localhost:4000/user/changeUserPassword/:user_id
  changeUserPassword = (req, res) => {
    let { user_id } = req.params;
    let { password } = req.body;

    let saltRounds = 8;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sql = `UPDATE user SET password = "${hash}" WHERE user_id = ${user_id}`;

        connection.query(sql, (error, result) => {
          error
            ? res.status(400).json({ error })
            : res.status(200).json(result);
        });
      });
    });
  };

  //-----------------------------------------------------
  //5.-Solicitud reseteo de contraseña
  //localhost:4000/user/resetPassword
  resetPassword = (req, res) => {
    let {email} = req.body;
    //realizo la consulta para sacar todos los datos del usuario, segun el correo indicado
    let sql = `SELECT * FROM user WHERE email = '${email}'`;

    connection.query(sql, (error, resultEmail) => {
       //si hay resultados, guardo en la variable password una contraseña generada de manera aleatoria
        if(resultEmail.length != 0){
            let password = generatePasswordRand(15, "rand");
            //encripto esa contraseña generada de manera aleatoria
            bcrypt.hash(password, 10, (error, hash) => {
              if(error){
                res.status(400).json({error});
              }
              else{
                //realizo la consulta de actualizacion de contraseña
                let sql2 = `UPDATE user SET password = '${hash}' WHERE user_id = ${resultEmail[0].user_id}`; 
            
                //mando la sentencia sql2 para ejecutarla
                connection.query(sql2, (error, result) =>{
                  error
                  ? res.status(400).json({ error })
                  : res.status(200).json({result:result, password:password, resultEmail: resultEmail});
                });
              }
          });
      }
      else{
        res.status(400).json({error: "El correo indicado no existe"});
      }
    });

  }

}

module.exports = new userControllers();
