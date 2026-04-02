export interface registerDto {
    fullName: string,
    email: string,
    password: string,
}

export interface loginDto {
    email: string,
    password: string,
}

export interface profileDto {
    fullName: String,
    email: String, 
    phone: String,
    image?: String,
    address: String,
}