import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Genders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 15, unique: true})
    name_ru: string;

    @Column({length: 15, unique: true})
    name_kz: string;
}
