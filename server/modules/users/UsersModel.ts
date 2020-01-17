import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Cities} from "../cities/CitiesModel";
import {Customers} from "../customers/CustomersModel";
import {Genders} from "../genders/GendersModel";
import {Types} from "../types/TypesModel";
import {Locales} from "../locales/LocalesModel";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 100, update: true})
    firstname: string;

    @Column({type: "varchar", length: 100, update: true})
    lastname: string;

    @Column({type: "varchar", length: 100, update: true})
    patronymic: string;

    @OneToOne(type => Types)
    @Column({type: 'int', precision: 2, update: true})
    role_id: number;

    @Column({type: "varchar", length: 50, unique: true, update: true})
    login: string;

    @Column({type: "varchar", length: 150, default: 'qwerty1234', update: true})
    password: string;

    @Column({type: "varchar", length: 100, unique: true, update: true})
    email: string;

    @Column({type: "date", update: true})
    b_day: Date;

    @Column({type: "boolean", default: false, update: true})
    isPremium: boolean;

    @Column({type: "varchar", length: 100, nullable: true})
    photo_path?: string;

    @Column({type: "varchar", length: 100, nullable: true, unique: true})
    photo_name?: string;

    @OneToOne(type => Cities)
    @Column({type: 'int', precision: 3, update: true})
    city_id: number;

    @OneToOne(type => Customers)
    @Column({type: 'int', precision: 3, update: true})
    customer_id: number;

    @OneToOne(type => Genders)
    @Column({type: 'int', precision: 2, update: true})
    gender_id: number;

    @Column({type: 'bigint', precision: 10, unique: true, update: true})
    phone: number;

    @OneToOne(type => Locales)
    @Column({type: 'int', precision: 3, update: true})
    locale_id: string;
}
