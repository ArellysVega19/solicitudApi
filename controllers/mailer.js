const { response } = require('express');
const nodemailer = require("nodemailer");

const SendMailer = async (req, res = response) => {

    const { name, apellido, email, phone, direccion } = req.body;

    contentHTML = `
    
    <div class="w3-container w3-green">
        <h1 style="color:rgb(59, 57, 182)">Datos del cliente</h1>
    </div>

    <ul>
        <li><i class="icofont-rounded-right"></i> <strong style="color:rgb(28, 112, 180)">Nombre:</strong> ${name}
        </li>
        <li><i class="icofont-rounded-right"></i> <strong style="color:rgb(28, 112, 180)">Apellido:</strong> ${apellido}
        </li>
        <li><i class="icofont-rounded-right"></i> <strong style="color:rgb(28, 112, 180)">Numero de telefono:</strong> ${phone}
        </li>
        <li><i class="icofont-rounded-right"></i> <strong style="color:rgb(28, 112, 180)">Correo electronico:</strong> ${email}
        </li>
        <li><i class="icofont-rounded-right"></i> <strong style="color:rgb(28, 112, 180)">Direccion domiciliaria:</strong> ${direccion}
        </li>
    </ul>
        <p><em style="color:rgb(94, 105, 114)" >Este correo es informativo y no puede responderse.</em></p>
    </div>
    <hr>
    <hr>`;


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "milenaarmijo2022@gmail.com", // Usuario
            pass: "Fernando45" // password
        }
    });

    let mailOptions = {
        from: "milenaarmijo2022@gmail.com", // desde donde se envia el correo
        to: "milenaarmijo2022@gmail.com", // list de correo a recivir el correo
        subject: "Solicitud", // Titulo del correo
        html: contentHTML
    };
    // enviar correo con objeto de transporte definido
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(400).json({
                status: -1,
                msg: 'Error Occured: ' + error
            });
        }
        else {
            res.status(201).json({
                status: 1,
                msg: 'Correo enviado: ' + info,
            });
        }
    });
}


module.exports = {
    SendMailer
}