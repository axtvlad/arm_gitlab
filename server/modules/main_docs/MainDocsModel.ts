import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Types} from "../types/TypesModel";

@Entity()
export class MainDocs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 20, unique: true})
    number: string;

    @Column({precision: 3})
    department_id: number;

    @Column({precision: 2, default: 1})
    status_id?: number;

    @Column({type: 'date', default: null})
    begin_date?: Date;

    @Column({type: "date", default: null})
    finish_date?: Date;

    @Column({type: "date", default: null})
    pub_date?: Date;

    @Column({length: 150, unique: true})
    name_ru: string;

    @Column({length: 150, default: null})
    name_kz?: string;

    @Column({length: 300, unique: true})
    header_ru: string;

    @Column({length: 300, default: null})
    header_kz?: string;

    @Column({length: 100})
    file_ru: string;

    @Column({length: 100, default: null})
    file_kz?: string;

    @Column({precision: 5, unique: true, default: null})
    description_id?: number;

    @Column({precision: 2})
    type_id: number;

    @Column({length: 300, unique: true, default: null})
    text_ru?: string;

    @Column({length: 300, unique: true, default: null})
    text_kz?: string;
}
