export interface RecoverPasswordFields {
    activationCode: string;
    newPassword: string;
    confirmNewPassword: string;
}

export enum RecoverPasswordFieldNames {
    ACTIVATION_CODE = 'activationCode',
    NEW_PASSWORD = 'newPassword',
    CONFIRM_NEW_PASSWORD = 'confirmNewPassword'
}

export interface RecoverPasswordEmailFields {
    email: string;
}

export enum RecoverPasswordEmailFieldNames {
    EMAIL = 'email',
}
