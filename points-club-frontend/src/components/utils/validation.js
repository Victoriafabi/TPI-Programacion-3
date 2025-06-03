import { jwtDecode } from "jwt-decode";

export const validateString = (str, minLength, maxLength) => {
    if (minLength && str.length < minLength) return false;
    if (maxLength && str.length > maxLength) return false;
    return true;
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return username && usernameRegex.test(username) && username.length <= 13;
};

export const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUppercase && hasNumber && hasSpecialChar;
};

export const validateLoginUser = ({ email, password }) => {
    if (!email || !validateEmail(email)) {
        return {
            error: true,
            message: "Mail inválido."
        };
    }

    if (!password || !validatePassword(password)) {
        return {
            error: true,
            message: "Contraseña inválida: debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
        };
    }

    return { error: false, message: "" };
};

export const validateRegisterUser = ({ name, email, password }) => {
    if (!validateUsername(name)) {
        return {
            error: true,
            message: "Nombre inválido: debe ser alfanumérico y tener hasta 13 caracteres."
        };
    }

    if (!validateEmail(email)) {
        return {
            error: true,
            message: "Email inválido."
        };
    }

    if (!validatePassword(password)) {
        return {
            error: true,
            message: "Contraseña inválida: debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
        };
    }

    return { error: false, message: "" };
};

export const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return currentTime < decodedToken.exp;
    } catch (error) {
        console.log('Error decoding token:', error);
        return false;
    }
};
