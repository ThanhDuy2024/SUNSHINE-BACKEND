import { loginDto, profileDto, registerDto } from "../../dto/authentication.dto";
import { hashPassword, verifyPassword } from "../../helpers/bcript.helper";
import { sendOtpByEmail } from "../../helpers/nodemailer.helper";
import { generateRandomString } from "../../helpers/randomString.helper";
import { Otp } from "../../Models/Otp.model";
import { Users } from "../../Models/Users.model";

export const registerService = async (data: registerDto) => {
    try {
        const checkEmail = await Users.findOne({
            where: {
                email: data.email
            }
        });

        if(checkEmail) {
            return false
        };

        const otpString = generateRandomString(5).toLocaleLowerCase();
        const password = hashPassword(data.password);
        data.password = password;
        const otpUser = new Otp({
            otp: otpString,
            fullName: data.fullName,
            email: data.email,
            password: data.password
        });

        await otpUser.save();

        sendOtpByEmail(data.email, otpString);

        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

export const verifyOtp = async (otp: string) => {
    try {
        const checkOtp = await Otp.findOne({
            otp: otp,
        });

        if(!checkOtp) {
            return false;
        };

        await Users.create({
            fullName: checkOtp.fullName,
            email: checkOtp.email,
            password: checkOtp.password,
        });

        await checkOtp.deleteOne();
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

export const loginService = async (data: loginDto) => {
    try {
        const account = await Users.findOne({
            where: {
                email: data.email,
            }
        });

        if(!account) {
            return false;
        };

        const checkPassword = verifyPassword(data.password, account.dataValues.password);

        if(checkPassword === false) {
            return false;
        };

        return account.dataValues;

    } catch (error) {
        console.log(error);
        return false
    }
}

export const profileService = async (data: profileDto, id: number) => {
    try {
        const account = await Users.findOne({
            where: {
                id: id,
            }
        });

        if(!account) {
            return false
        }

        if(account.dataValues.email != data.email) {
            const checkEmail = await Users.findOne({
                where: {
                    email: data.email,
                }
            });

            if(checkEmail) {
                return false
            }
        }
        await account.update(data);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}