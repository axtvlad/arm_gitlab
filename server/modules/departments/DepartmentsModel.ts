import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Departments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, unique: true})
    name_ru: string;

    @Column({length: 100, unique: true})
    name_kz: string;
}
