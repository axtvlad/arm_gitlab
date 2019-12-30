import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName_ru: string;

    @Column()
    firstName_kz: string;

    @Column()
    lastName_ru: string;

    @Column()
    lastName_kz: string;

    @Column()
    patronymic_ru: string;

    @Column()
    patronymic_kz: string;

    @Column()
    role_id: number;

    @Column({unique: true})
    login: string;

    @Column({default: 'qwerty1234'})
    password: string;

    @Column({unique: true})
    email: string;

    @Column({type: "date"})
    b_day: Date;

    @Column({default: false})
    isPremium: boolean;

    @Column()
    photo?: string;

    @Column()
    city_id: number;

    @Column()
    institution_id: number;

    @Column()
    gender_id: number;

    @Column({
        type: "int",
        length: 10,
        unique: true,
    })
    phone: number;
}
