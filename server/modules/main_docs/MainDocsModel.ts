import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class MainDocs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    number: string;

    @Column()
    department_id: number;

    @Column()
    status_id: number;

    @Column()
    begin_date: Date;

    @Column()
    finish_date: Date;

    @Column()
    pub_date: Date;

    @Column({unique: true})
    name_ru: string;

    @Column({unique: true})
    name_kz: string;

    @Column()
    header_ru: string;

    @Column()
    header_kz: string;

    @Column()
    path_ru: string;

    @Column()
    path_kz: string;

    @Column()
    f_name_ru: string;

    @Column()
    f_name_kz: string;

    @Column()
    author_id: number;

    @Column()
    description_id: number;

    @Column()
    type_id: number;

    @Column()
    text_ru: string;

    @Column()
    text_kz: string;
}
