import { Resend } from 'resend'
import dotenv from 'dotenv'
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY || '')

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        const info = await resend.emails.send({
            from: 'UpTask <no-reply@resend.dev>',
            to: user.email,
            subject: 'UpTask - Confirma tu cuenta',
            html: `<p>Hola: ${user.name} has creado tu cuenta en UpTask, ya casi está todo listo, solo debes confirmar tu cuenta.</p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                <p>E ingresa el código: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>`
        })
        console.log('Mensaje enviado', info.data.id)
    }

    static sendPasswordResetToken = async (user: IEmail) => {
        const info = await resend.emails.send({
            from: 'UpTask <no-reply@resend.dev>',
            to: user.email,
            subject: 'UpTask - Reestablece tu password',
            html: `<p>Hola: ${user.name} has solicitado reestablecer tu password.</p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Password</a>
                <p>E ingresa el código: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>`
        })
        console.log('Mensaje enviado', info.data.id)
    }
}