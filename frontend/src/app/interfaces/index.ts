import {AbstractControl} from "@angular/forms";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export interface IFile {
    id: number;
    value: File | null;
    minHeight: string;
}

export interface IFormObj {
    selected: boolean;
    obj: IProfileFormData
    answer?: string;

}

export interface IProfileFormData {
    id: number;
    value: string;
    selected: boolean;
    name: string;
    type: string;
    icon?: IconDefinition;

}


export interface ICreativityInterest {
    id: number;
    value: string;
    selected: boolean;
    name: string;
    type: string;
}


export interface IForgotPasswordForm {
    email: string | null;
}

export interface IPasswordResetForm {
    uid: number;
    token: string;
    password: AbstractControl<any, any> | null;
}



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
    id: number;
    avatar_url: string;
    created_at: Date;
    email: string;
    first_name: string;
    gender: string;
    last_name: string;
    latitude: string;
    longitude: string;
    city: string;
    state: string;
    logged_in: boolean;
}


export interface ILogoutResponse {
    message?: string;
}

export interface ILoginResponse {
    message?: string;
    tokens: ITokens;
    user: IUser;
}

export interface IRefreshUserResponse {
    user: IUser;
}
