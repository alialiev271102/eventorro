import { Message, RegisterOptions, ValidationRule } from 'react-hook-form';

const maxLength = (length: number) => ({
    value: length,
    message: `Максимальная длина ${length} символов`,
});

const minLength = (length: number) => ({
    value: length,
    message: `Минимальная длина ${length} символов`,
});

export const required: ValidationRule<boolean> | Message = {
    value: true,
    message: 'Обязательное поле',
};

const emailPattern: ValidationRule<RegExp> = {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Введите правильный адрес электронной почты',
};

const nicknamePattern: ValidationRule<RegExp> = {
    value: /^(?=.*[a-zA-Zа-яА-Я])[a-zA-Zа-яА-Я0-9]+$/,
    message: 'Недопустимое имя',
};

const surnamePattern: ValidationRule<RegExp> = {
    value: /^(?=.*[a-zA-Zа-яА-Я])[a-zA-Zа-яА-Я0-9]+$/,
    message: 'Недопустимая Фамилия',
};

const youtubeLinkPattern: ValidationRule<RegExp> = {
    value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/)?([\w-]+)(\S+)?$/,
    message: 'Ведите коректный URL',
};

const patternPhone: ValidationRule<RegExp> = {
    value: /^\+996\d{9}$/,
    message: 'Ведите корректные данные',

};

export const nicknameSchema: RegisterOptions = {
    minLength: minLength(2),
    maxLength: maxLength(16),
    required,
    pattern: nicknamePattern,
};

export const surnameSchema: RegisterOptions = {
    minLength: minLength(2),
    maxLength: maxLength(16),
    required,
    pattern: surnamePattern,
};

export const organizationSchema: RegisterOptions = {
    minLength: minLength(3),
    maxLength: maxLength(20),
    required,
};

export const emailSchema: RegisterOptions = {
    required,
    pattern: emailPattern,
};

export const signInPasswordSchema: RegisterOptions = {
    required,
};

export const signUpPasswordSchema: RegisterOptions = {
    minLength: minLength(8),
    maxLength: maxLength(20),
    required,
};

export const activationCodeForForgetPasswordSchema: RegisterOptions = {
    minLength: minLength(8),
    maxLength: maxLength(8),
    required,
};

export const eventNameSchema: RegisterOptions = {
    minLength: minLength(5),
    maxLength: maxLength(40),
    required,
};

export const eventDescriptionSchema: RegisterOptions = {
    minLength: minLength(10),
    maxLength: maxLength(2200),
    required,
};

export const eventLocationSchema: RegisterOptions = {
    
};

export const eventLanguageSchema: RegisterOptions = {
    required,
};

export const youtubeLinkSchema: RegisterOptions = {
    pattern: youtubeLinkPattern,
};

export const phoneSchema: RegisterOptions = {
    minLength: minLength(10),
    maxLength: maxLength(13),
    pattern: patternPhone,
    required,
};
