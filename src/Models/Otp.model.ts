import mongoose from 'mongoose';
const { Schema } = mongoose;

const otp = new Schema({
    otp: String,
    fullName: String,
    email: String,
    password: String,

    expireAt: {
        type: Date,
        default: Date.now,
        expires: 300
    }
})

export const Otp = mongoose.model("Otp", otp, "Otp");