interface UserType {
    label: string;
    value: string;
}

export const UserTypes: UserType[] = [
    {
        value: 'user',
        label: 'Регистрация как гость',
    },
    {
        value: 'host',
        label: 'Регистрация как организатор',
    },
];
