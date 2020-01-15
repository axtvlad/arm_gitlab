import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Departments} from "../departments/DepartmentsModel";
import {Statuses} from "../statuses/StatusesModel";
import {Types} from "../types/TypesModel";

@Entity()
export class MainDocs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 20, unique: true, update: true})
    number: string;

    @OneToOne(type => Departments)
    @Column({type: "int", precision: 3, update: true})
    department_id: number;

    @OneToOne(type => Statuses)
    @Column({type: "int", precision: 2, update: true})
    status_id: number;

    @Column({type: "date", update: true})
    begin_date: Date;

    @Column({type: "date", update: true})
    finish_date: Date;

    @Column({type: "date", update: true})
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
    path: string;

    @Column({type: "varchar", length: 100, unique: true})
    f_name_ru: string;

    @Column({type: "varchar", length: 100, unique: true})
    f_name_kz: string;

    @Column({type: "int", precision: 5, unique: true, update: true})
    description_id: number;

    @OneToOne(type => Types)
    @Column({type: "int", precision: 2, update: true})
    type_id: number;

    @Column({type: "varchar", length: 300, unique: true, nullable: true, update: true})
    text_ru?: string;

    @Column({type: "varchar", length: 300, unique: true, nullable: true, update: true})
    text_kz?: string;
}
