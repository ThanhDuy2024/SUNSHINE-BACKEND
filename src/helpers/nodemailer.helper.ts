const nodemailer = require('nodemailer');
export const sendOtpByEmail = (receive:string, otp: string) => {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // use false for STARTTLS; true for SSL on port 465
        auth: {
            user: String(process.env.USER_EMAIL),
            pass: String(process.env.APP_PASSWORD),
        }
    });

    // Configure the mailoptions object
    const mailOptions = {
        from: String(process.env.USER_EMAIL),
        to: String(receive),
        subject: 'Sunshine-shop OTP',
        text: `Ma OTP cua ban la ${otp}`
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
}