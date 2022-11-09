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

export interface ITokens {
    access_token: string;
    refresh_token: string;
}


export interface IUser {
    avatar_url: string;
    created_at: Date;
    email: string;
    first_name: string;
    gender: string;
    last_name: string;
    latitude: string;
    longitude: string;
    location: string;
    logged_in: boolean;
}


export interface ILoginResponse {
    message?: string;
    tokens: ITokens;
    user: IUser;
}

export interface IRefreshUserResponse {
    user: IUser;
}
