import colors from 'colors'
import mongoose from 'mongoose'
import { exit } from 'node:process'

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/defaultdb')
        const url = `${connection.host}:${connection.port}`
        console.log(colors.magenta.bold(`MongoDB Conectado en: ${url}`))
    } catch (error) {
        console.log(colors.red.bold('Error al conectar a MongoDB'))
        exit(1)
    }
}