import {Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    userId: string;

    @Column({length: 100})
    firstName: string;

    @Column({length: 100})
    lastName: string;

    @Column({default: null, length: 100})
    patronymic?: string;

    @Column({length: 50, unique: true})
    login: string;

    @Column({length: 150})
    password: string;

    @Column({length: 100, unique: true})
    email: string;

    @Column({default: null})
    photo?: string;

    // @OneToOne(type => Types)
    @Column({precision: 2, default: 1})
    role_id?: number;

    // @OneToOne(type => Cities)
    @Column({precision: 3, default: null})
    city_id?: number;

    // @OneToOne(type => Customers)
    @Column({precision: 3, default: null})
    customer_id?: number;

    // @OneToOne(type => Genders)
    @Column({precision: 2, default: null})
    gender_id?: number;

    @Column({type: 'bigint', precision: 10, unique: true, default: null})
    phone?: number;

    // @OneToOne(type => Locales)
    @Column({precision: 2, default: 1})
    locale_id?: number;

    @Column({type: 'timestamp', default: null})
    birthAt?: Date;

    @Column({default: false})
    isAdmin?: boolean;

    @Column({default: false})
    isPremium?: boolean;

    @Column({default: false})
    isBanned?: boolean;
}
