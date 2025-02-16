import { transporter } from '../config/nodemailer';
import dotenv from 'dotenv';
dotenv.config();

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        const mailOptions = {
            from: 'UpTask <ignaciotosini2002@gmail.com>', // Asegúrate de usar tu email configurado
            to: user.email,
            subject: 'UpTask - Confirma tu cuenta',
            html: `<p>Hola: ${user.name} has creado tu cuenta en UpTask, ya casi está todo listo, solo debes confirmar tu cuenta.</p>
                   <p>Visita el siguiente enlace:</p>
                   <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                   <p>E ingresa el código: <b>${user.token}</b></p>
                   <p>Este token expira en 10 minutos</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
            } else {
                console.log('Mensaje enviado:', info.response);
            }
        });
    };

    static sendPasswordResetToken = async (user: IEmail) => {
        const mailOptions = {
            from: 'UpTask <ignaciotosini2002@gmail.com>',
            to: user.email,
            subject: 'UpTask - Reestablece tu password',
            html: `<p>Hola: ${user.name} has solicitado reestablecer tu password.</p>
                   <p>Visita el siguiente enlace:</p>
                   <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Password</a>
                   <p>E ingresa el código: <b>${user.token}</b></p>
                   <p>Este token expira en 10 minutos</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
            } else {
                console.log('Mensaje enviado:', info.response);
            }
        });
    };
}