import {AbstractControl} from "@angular/forms";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";


export interface IMatchPreviewResponse {
    matches: IMatch[];
    message: string;
    has_next: boolean;
    page: number;
}

export interface IMatch {
    id: number;
    images: string[];
    stranger: {
        id: number;
        seen: boolean;
        user: IUser;
    }
}

export interface IStrangerUser {
    state: string;
    city: string;
    interests: IProfileFormData[];
    basics: IProfileFormData[]
    bio: string;
    dob: string;
    first_name: string;
    id: number;
    last_name: string;
    prompts: IProfileFormData[];
}



export interface IMessage {
    id: number;
    sender: {first_name: string, last_name: string, id: number};
    group: number;
    receiver: {first_name: string, last_name: string, id: number};
    text: string;
}

export interface IMessagesResponse {
    message?: string;
    messages: IMessage[]
}

export interface IGroup {
    id: number;
    user_one: number;
    user_two: number;

}

export interface ICreateGroupResponse {
    message?: string;
    group: IGroup;
}

export interface IStranger {
    id: number;
    seen: boolean;
    seen_by: number | null;
    user_id: number;
    images: string[];
    distance: number;
    user: IStrangerUser;
}


export interface IMatchPreview {
    images: string[];
    first_name: string;
    last_name: string;
    id: number;
}


export interface IRetrieveProfileResponse {
    message?: string;
    profile?: IStranger;
}


export interface IRetrieveStrangerResponse {
    message: string;
    stranger?: IStranger;
    match_preview?: IMatchPreview;
}



export interface IProfile {
    images: string[];
    basics: IProfileFormData[];
    bio: string;
    interests: IProfileFormData[];
    prompts: IProfileFormData[];
}

export interface IGetProfileResponse {
    message: string;
    profile: IProfile;

}


export interface IFile {
    id: number;
    value: File | null;
    minHeight: string;
    src: string;
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
