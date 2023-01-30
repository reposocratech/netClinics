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
    const { name, lastname, email} = req.body;

    let info = `<h2>¡Hola ${name} ${lastname}!</h2>
        <p><strong>¡Enhorabuena!</strong> su perfil profesional ha sido validado por el administrador</p>
        <p>Desde este momento ya formas parte de nuestra comunidad NetClinics, recuerda tener actualizado tu perfil y tu disponibilidad horaria semanal</p>
        <p>Los usuarios ya pueden solicitar cita contigo, cuando se solicite un cita recibirás un email con los datos de la cita, dicha cita tendrás que confirmarla en tu panel de "citas pendiente de confirmación"</p>`;

    let mailto = email;

    const mailmsg = {
      from: '"NetClinics" <netclinicsmvp@gmail.com>', // Remitente
      to: mailto,
      subject: "Perfil Profesional Validado", // Asunto
      html: info,
    };

    transporter
      .sendMail(mailmsg)
      .then((trans) => {
        res.status(200).send("Perfil Profesional Validado");
      })
      .catch((error) => {
        res.status(500).send("Algo ha salido mal!: " + error);
      });
    };


  sendEmailAppointment = (req, res) => {
    
    const namePatient = req.body.patient.name;
    const lastNamePatient = req.body.patient.lastname;

    const nameMedic = req.body.medic.name;
    const lastNameMedic = req.body.medic.lastname;
    const emailMedic = req.body.medic.email;

    let {date, appointment_time, appointment_commentary} = req.body.appointment;

    date = date.split("-").reverse().join("-");

    let info = `<h2>¡Hola ${nameMedic} ${lastNameMedic}!</h2>
    <p>Le informamos que tiene una nueva cita <strong>pendiente de validar</strong></p>
    <p><strong>Paciente</strong>: ${namePatient} ${lastNamePatient}</p>
    <p><strong>Fecha Cita</strong>: ${date}</p>
    <p><strong>Hora</strong>: ${appointment_time}</p>
    <p><strong>Comentario Cita</strong>: ${appointment_commentary}</p>`;

    let mailto = emailMedic;

    const mailmsg = {
      from: '"NetClinics" <netclinicsmvp@gmail.com>', // Remitente
      to: mailto,
      subject: `Nueva Cita para el ${date}`, // Asunto
      html: info,
    };

    transporter
      .sendMail(mailmsg)
      .then((trans) => {
        res.status(200).send("Nueva cita pendiente de validar");
      })
      .catch((error) => {
        res.status(500).send("Algo ha salido mal!: " + error);
      });
  };

  sendResetPassword = (req, res) => {
    const {password} = req.body;
    const {name, lastname, email} = req.body.user;

    let info = `<h2>¡Hola! ${name} ${lastname}</h2>
        <p>Hemos generado la siguiente contraseña para tu usuario:</p>
        <p><strong>${password}</strong></p>
        <p>Acceda a su perfil y cambie la contraseña por su seguridad</p>`;

    let mailto = email;
    
    const mailmsg = {
      from: '"NetClinics" <netclinicsmvp@gmail.com>', // Remitente
      to: mailto,
      subject: `Reinicio de Contraseña: ${password}`, // Asunto
      html: info,
    };

    transporter
      .sendMail(mailmsg)
      .then((trans) => {
        console.log(trans);
      })
      .catch((error) => {
        res.status(500).send("Algo ha salido mal!: " + error);
      });
    };
    
}




module.exports = new nodeMailerController();
