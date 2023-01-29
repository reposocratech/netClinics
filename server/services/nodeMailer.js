require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true para 465, false para otros
    auth: {
      user: "netclinicsmvp@gmail.com", // user
      pass: "kegwgoykhnmljsol", // password de aplicación
    },
});

class nodeMailerController {
  
  // Envía email de confirmación al nuevo usuario cuando se registra
  sendRegistrationMedic = (req, res) => {

    const { name, lastName, email } = req.body;

    console.log(req);

    let info = `<h1>Bienvenido a NetClinics ${name}</h1>
        <h4>Hola, ${name} ${lastName} te damos la bienvenida a nuestra plataforma.</h4>
        <p>Vamos a revisar la documentación adjunta en el registro,
        una vez validemos la documentación podrás aparecer en 
        las búsqueda de nuestros usuarios y empezar a recibir citas</p>
        <p><strong>Recuerda, desde este momento, puedes acceder a tu perfil, editarlo para ir añadiendo zonas donde prestaras servicios, tus especialidades, tarifa de precios, titulos, etc...</strong></p>
        <p>Cuando su perfil esté validado mandaremos un nuevo email para que estés informado de todo el proceso</p>`;

    const mailmsg = {
      from: '"NetClinics" <netclinicsmvp@gmail.com>', // Remitente
      to: email,
      subject: "Bienvenido a Netclinics", // Asunto
      html: info,
    };

    transporter
      .sendMail(mailmsg)
      .then((trans) => {
        res.status(200).send("Gracias por registrarte");
      })
      .catch((error) => {
        res.status(500).send("Algo ha salido mal!: " + error);
      });
  };

  sendRegistrationAdmin = (req, res) => {
    const { name, lastName, medic_membership_number} = req.body;

    let info = `<h3>Un nuevo profesional se ha registrado</h3>
        <p>Hola, se ha registrado en la plataforma el profesional <strong>${name} ${lastName}</strong> con número de colegiado <strong>${medic_membership_number}</strong>.</p>
        <p>Accede al panel de administración para revisar la documentacion y validar al profesional</p>`;

    let mailto = "netclinicsmvp@gmail.com";

    const mailmsg = {
      from: '"NetClinics" <netclinicsmvp@gmail.com>', // Remitente
      to: mailto,
      subject: "Nuevo profesional registrado", // Asunto
      html: info,
    };

    transporter
      .sendMail(mailmsg)
      .then((trans) => {
        res.status(200).send("Profesional Registrado");
      })
      .catch((error) => {
        res.status(500).send("Algo ha salido mal!: " + error);
      });
  };

  sendAvailabilityMedic = (req, res) => {
    
  }

}

module.exports = new nodeMailerController();
