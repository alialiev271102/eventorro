export interface ResetPasswordFields {
    newPassword: string;
    confirmNewPassword: string;
}

export enum ResetPasswordFieldNames {
    NEW_PASSWORD = 'newPassword',
    CONFIRM_NEW_PASSWORD = 'confirmNewPassword'
}
