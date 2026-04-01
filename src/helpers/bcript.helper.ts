import bcrypt from 'bcryptjs';
export const hashPassword = (password: string) => {
    const salt: any = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const verifyPassword = (password: string, dbPassword: string) => {
    const checkPassword = bcrypt.compareSync(password, dbPassword);
    if(!checkPassword) {
        return false
    }

    return true
}