import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const config = () => ({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

export const transporter = nodemailer.createTransport(config());