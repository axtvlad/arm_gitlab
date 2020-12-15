export type UserType = {
    id: number
    userId: string
    firstName: string
    lastName: string
    patronymic: string
    login: string
    password: string
    email: string
    photo: string
    role_id: number
    city_id: number
    customer_id: number
    gender_id: number
    phone: number
    locale: string
    birthAt: string
    isAdmin: boolean
    isPremium: boolean
    isBanned: boolean
}

export type NewUserType = {
    firstName: string
    lastName: string
    patronymic: string
    login: string
    password: string
    email: string
    photo: string
    role_id: number
    city_id: number
    customer_id: number
    gender_id: number
    phone: number
    locale: string
    birthAt: string
    isAdmin: boolean
    isPremium: boolean
    isBanned: boolean
}

export type AuthDataType = {
    login: string
    password: string
}

export interface NewDirectoryType {
    name_ru: string
    name_kz: string
}

export interface DirectoryType extends NewDirectoryType{
    id: number
}

export type NewFaqType = {
    question_ru: string
    question_kz: string
    answer_ru: string
    answer_kz: string
}

export type FaqType = {
    id: number
    question_ru: string
    question_kz: string
    answer_ru: string
    answer_kz: string
}

export type NewMainDocType = {
    num: string;
    department_id: number;
    status_id?: number;
    begin_date?: string;
    finish_date?: string;
    pub_date?: string;
    name_ru: string;
    name_kz?: string;
    header_ru: string;
    header_kz?: string;
    file_ru: string;
    file_kz?: string;
    description_ru?: string;
    description_kz?: string;
    type_id: number;
    text_ru?: string;
    text_kz?: string;
    tags: string;
}

export type MainDocType = {
    id: number
    num: string;
    department_id: number;
    status_id?: number;
    begin_date?: string;
    finish_date?: string;
    pub_date?: string;
    name_ru: string;
    name_kz?: string;
    header_ru: string;
    header_kz?: string;
    file_ru: string;
    file_kz?: string;
    description_ru?: string;
    description_kz?: string;
    type_id: number;
    text_ru?: string;
    text_kz?: string;
    tags: string;
}

export type NewTemplateType = {
    name_ru: string
    name_kz: string
    category_id: number
    file_ru: string
    file_kz: string
}

export type TemplateType = {
    id: number
    name_ru: string
    name_kz: string
    category_id: number
    file_ru: string
    file_kz: string
}

export type NewOtherDocType = {
    name_ru: string
    name_kz: string
    file_ru: string
    file_kz: string
}

export type OtherDocType = {
    id: number
    name_ru: string
    name_kz: string
    file_ru: string
    file_kz: string
}