export interface IRegisterForm {
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    password: string;
    confirm_password: string;
}

export interface ILoginForm {
    email?: string | null | undefined;
    password?: string | null | undefined;
}
