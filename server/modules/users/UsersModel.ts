import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 100, update: true})
    firstName_ru: string;

    @Column({type: "varchar", length: 100, update: true})
    firstName_kz: string;

    @Column({type: "varchar", length: 100, update: true})
    lastName_ru: string;

    @Column({type: "varchar", length: 100, update: true})
    lastName_kz: string;

    @Column({type: "varchar", length: 100, update: true})
    patronymic_ru: string;

    @Column({type: "varchar", length: 100, update: true})
    patronymic_kz: string;

    @Column({type: 'int', precision: 2, update: true})
    role_id: number;

    @Column({type: "varchar", length: 50, unique: true, update: true})
    login: string;

    @Column({type: "varchar", length: 50, default: 'qwerty1234', update: true})
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

    @Column({type: 'int', precision: 3, update: true})
    city_id: number;

    @Column({type: 'int', precision: 3, update: true})
    customer_id: number;

    @Column({type: 'int', precision: 2, update: true})
    gender_id: number;

    @Column({type: 'int', precision: 10, unique: true, update: true})
    phone: number;
}
