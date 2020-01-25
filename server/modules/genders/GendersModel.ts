import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Genders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({precision: 2, unique: true})
    num: number;

    @Column({length: 15, unique: true})
    name_ru: string;

    @Column({length: 15, unique: true})
    name_kz: string;
}
