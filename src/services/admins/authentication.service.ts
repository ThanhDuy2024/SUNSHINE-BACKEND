import { loginDto, profileDto, registerDto } from "../../dto/authentication.dto";
import { hashPassword, verifyPassword } from "../../helpers/bcript.helper";
import { Admin } from "../../Models/Admins.model";

export const registerService = async (data: registerDto) => {
    try {
        const checkEmail = await Admin.findOne({
            where: {
                email: data.email,
            }
        });

        if (checkEmail) {
            return false
        };

        const password = hashPassword(data.password);
        data.password = String(password);

        await Admin.create({
            fullName: data.fullName,
            email: data.email,
            password: data.password
        });

        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export const loginService = async (data: loginDto) => {
    try {
        const account = await Admin.findOne({
            where: {
                email: data.email,
                status: 'active',
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
        const account = await Admin.findOne({
            where: {
                id: id,
            }
        });

        if(!account) {
            return false
        };

        if(account.dataValues.email != data.email) {
            const checkEmail = await Admin.findOne({
                where: {
                    email: data.email,
                }
            })

            if(checkEmail) {
                return false
            }
        }

        await account.update(data);
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}