# Proyecto: Invitaciones QR
El equipo de eugenia ha decidido crear un nuevo incremento a su producto: quiere que los usuarios puedan generar invitaciones digitales para sus invitados en forma de un código QR, mismo que podrán compartir a sus invitados para acelerar el proceso de entrada a su residencial.

## Requerimientos
Como proyecto alfa, se ha decidido crear un prototipo en React para poner a prueba el nuevo feature.

## Usuarios y autenticación.
La aplicación deberá contar con un sistema de autenticación y autorización para que los usuarios puedan iniciar sesión, registrarse si no tienen cuenta (utilizando correo electrónico y contraseña), y recuperar contraseña a través de su correo electrónico en caso de que la extravíen.

## Tabla de contenido

    -[x] El modelo de usuario deberá contemplar los siguientes campos: Nombre, apellidos,email, password (encriptado), no. de departamento.

    -[x] Los usuarios pordrán cerrar sesión en cualquier momento.
    -[x] El módulo de invitaciones será visible únicamente para los usuarios que hayan iniciado sesión.
    -[x] El usuario tendrá la opción de crear una nueva invitación, visualizar el detalle de una invitación, visualizar el código QR de una invitación y eliminar una invitación.
    -[x] Para crear una invitación, el usuario deberá llenar un formulario sencillo con los siguientes datos: Nombre invitado, fecha y hora de entrada, fecha de caducidad.
    -[x] El sistema deberá validar que los campos son correctos para poder proceder a crear la invitación.
    -[x] Al crear una invitacion exitosa, el sistema deberá mostrar un diálogo emergente (modal) que mostrará un código QR que tendrá codificado la información de la invitación.

## Intrucciones de ejecución

    instalar entorno de node >= 16 

    npm install 

    establecer puerto de servidor con variable de entorno process.env.PORT

    npm run start:dev



