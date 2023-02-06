# NetClinics
Este proyecto es una aplicación web realizada por [equipo Socratech](#contacto) como proyecto final del Bootcamp Full-Stack Developer en [Socratech](https://socratech.es/) para la empresa NetClinics

## Tabla de Contenidos
* [Información General](#informacion-general)
* [Tecnologías utilizadas](#tecnologías-utilizadas)
* [Capturas de la aplicación](#capturas-de-la-apliación)
* [Instalación y configuración](#instalación-y-configuración)
* [Contacto](#contacto)

## Información General
- NetClinics, es una aplicación que permite a un paciente solicitar un médico con la mayor antelación posible, de forma que pueda ser atendido en el mismo día sin tener que pasar por listas de espera.


## Tecnologías utilizadas
- Front-end: ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) 
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?style=flat-square&logo=bootstrap)
![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript)
![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
- Back-end: ![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- Base de datos: ![MySQL](https://img.shields.io/badge/-MySQL-black?style=flat-square&logo=mysql)
<br/>
[  Librerías:  Multer  |  Bcrypt  |  Nodemon  |  Nodemailer  |  JsonWebToken | JWT-Decode | React-Router-DOM | Axios | MUI]

## Capturas de la aplicación
Vista Login (Inicio):
<br/>
![Vista Login (Inicio)](https://github.com/reposocratech/netClinics/blob/main/screenshots/1-Login.png)
<br/>
<br/>
Registro Paciente:
<br/>
![Registro Paciente](https://github.com/reposocratech/netClinics/blob/main/screenshots/2-Registro-Paciente.png)
<br/>
<br/>
Registro Fisioterapeuta:
<br/>
![Registro Fisioterapeuta](https://github.com/reposocratech/netClinics/blob/main/screenshots/3-Registro-M%C3%A9dico.png)
<br/>
<br/>
Home Administrador:
<br/>
![Home Administrador](https://github.com/reposocratech/netClinics/blob/main/screenshots/4-Home-Admin.png)
<br/>
<br/>
Home Fisioterapeuta:
<br/>
![Home Fisioterapeuta](https://github.com/reposocratech/netClinics/blob/main/screenshots/5-Home-Medico.png)
<br/>
<br/>
Home Paciente:
<br/>
![Home Paciente](https://github.com/reposocratech/netClinics/blob/main/screenshots/3-Registro-M%C3%A9dico.png)

## Instalación y configuración

1 - Crear la base de datos mediante el script netclinics.sql, localizado en el directorio /data<br/>
2 - Copiar el archivo .env (proporcionado aparte, no disponible en este repositorio) en el directorio /server<br/>
3 - El archivo ubicado /server/services/nodeMailer.js sustituir el email "netclinicsmvp@gmail.com" por el que vaya a utilizarse para enviar las comunicaciones a los usuarios (registros nuevos, citas, validaciones, etc...).
<br/>
4 - Desde el directorio /server, ejecutar: <br/>
   npm i
<br/>
Esto instalará las dependencias necesarias en el servidor.
<br/>
5 - Desde el directorio /client, ejecutar:<br/>
   npm i
<br/>
Esto instalará las dependencias necesarias en el cliente.
<br/>
6 - Desde el directorio /server, lanzar el servidor mediante el comando:<br/>
   npm run dev
<br/>
7 - Desde el directorio /client, ejecutar el cliente mediante el comando:<br/>
      npm start
<br/>
8 - En el navegador, ir a la dirección: <br/>
   localhost:3000
<br/>
9 - La aplicación web se ejecutará entonces en el navegador.
<br/>

## Contacto
Este proyecto ha sido realizado por un equipo de 4 desarrolladores compuesto por:
- [Ana de la Mata Giraldo](https://www.linkedin.com/in/anadelamatagiraldo/)
- [Jonathan Garrido Chacón](https://www.linkedin.com/in/jonathangarridochacon/)
- [Luis Domínguez Díez](https://www.linkedin.com/in/luis-evaristo-dom%C3%ADnguez-d%C3%ADez-a58b81251/)
- [Oscar Anaya Velazco](https://www.linkedin.com/in/oscar-anaya-velasco/)
