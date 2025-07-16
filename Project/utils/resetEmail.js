import nodemailer from 'nodemailer'
import 'dotenv/config'

const transpoter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const sendResetEmail = async (to, token) => {
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Password Reset Request',
        html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="${resetURL}">link</a> to set a new password</p>
            <p>This link will expire in 1 hour</p>
        `
    }

    await transpoter.sendMail(mailOptions)
}