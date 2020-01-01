import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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

    @Column('int')
    role_id: number;

    @Column({unique: true})
    login: string;

    @Column({default: 'qwerty1234'})
    password: string;

    @Column({unique: true})
    email: string;

    @Column({type: "date"})
    b_day: Date;

    @Column()
    isPremium: boolean;

    @Column({nullable: true})
    photo?: string;

    @Column('int')
    city_id: number;

    @Column('int')
    customer_id: number;

    @Column('int')
    gender_id: number;

    @Column({
        type: 'int',
        scale: 10,
        unique: true,
    })
    phone: number;
}
