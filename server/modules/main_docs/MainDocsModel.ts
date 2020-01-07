import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class MainDocs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 20, unique: true, update: true})
    number: string;

    @Column({type: "int", length: 3, update: true})
    department_id: number;

    @Column({type: "int", length: 2, update: true})
    status_id: number;

    @Column({type: "date", length: 10, update: true})
    begin_date: Date;

    @Column({type: "date", length: 10, update: true})
    finish_date: Date;

    @Column({type: "date", length: 10, update: true})
    pub_date: Date;

    @Column({type: "varchar", length: 150, unique: true, update: true})
    name_ru: string;

    @Column({type: "varchar", length: 150, unique: true, update: true})
    name_kz: string;

    @Column({type: "varchar", length: 300, unique: true, update: true})
    header_ru: string;

    @Column({type: "varchar", length: 300, unique: true, update: true})
    header_kz: string;

    @Column({type: "varchar", length: 100})
    path_ru: string;

    @Column({type: "varchar", length: 100})
    path_kz: string;

    @Column({type: "varchar", length: 100, unique: true})
    f_name_ru: string;

    @Column({type: "varchar", length: 100, unique: true})
    f_name_kz: string;

    @Column({type: "int", length: 5, unique: true, update: true})
    description_id: number;

    @Column({type: "int", length: 2, update: true})
    type_id: number;

    @Column({type: "varchar", length: 300, unique: true, nullable: true, update: true})
    text_ru?: string;

    @Column({type: "varchar", length: 300, unique: true, nullable: true, update: true})
    text_kz?: string;
}
