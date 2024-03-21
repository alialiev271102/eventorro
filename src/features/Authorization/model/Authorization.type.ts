export type AuthorizationType = 'signIn' | 'signUp'

export interface AuthorizationTypeProps {
    className?: string;
}

export interface SignInFields {
    email: string;
    password: string;
}

export enum SignInFieldsNames{
    EMAIL = 'email',
    PASSWORD = 'password',
}

export interface SignUpFields {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    organizationName: string;
    phone: string;
    role: 'host' | 'user'
}

export enum SignUpFieldsNames {
    NAME = 'name',
    LAST_NAME = 'lastName',
    EMAIL = 'email',
    PASSWORD = 'password',
    CONFIRM_PASSWORD = 'confirmPassword',
    ROLE = 'role',
    PHONE = 'phone',
    ORGANIZATION_NAME = 'organizationName',
}
