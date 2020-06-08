import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class MainDocs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 20, unique: true})
    num: string;

    @Column({precision: 3})
    department_id: number;

    @Column({precision: 2, default: null})
    status_id?: number;

    @Column({type: 'date', default: null})
    begin_date?: Date;

    @Column({type: "date", default: null})
    finish_date?: Date;

    @Column({type: "date", default: null})
    pub_date?: Date;

    @Column({length: 1000, unique: true})
    name_ru: string;

    @Column({length: 1000, default: null})
    name_kz?: string;

    @Column({length: 300, unique: true})
    header_ru: string;

    @Column({length: 300, default: null})
    header_kz?: string;

    @Column({length: 1000})
    file_ru: string;

    @Column({length: 1000, default: null})
    file_kz?: string;

    @Column({length: 3000, default: null})
    description_ru?: string;

    @Column({length: 3000, default: null})
    description_kz?: string;

    @Column({precision: 2})
    type_id: number;

    @Column({length: 300, unique: true, default: null})
    text_ru?: string;

    @Column({length: 300, unique: true, default: null})
    text_kz?: string;

    @Column({length: 5000})
    tags: string;
}
