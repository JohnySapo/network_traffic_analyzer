export type UserAuthenticationToken = {
    token: string;
    message: string;
}

export type UserRole = {
    role: string;
}

export type UserLogin = {
    username: string;
    password: string;
}

export type UserRegister = { 
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type UserAccount = {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
}

export type UserPassword = { 
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}