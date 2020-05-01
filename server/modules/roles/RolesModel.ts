import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50, unique: true})
    name_ru: string;

    @Column({length: 50, unique: true})
    name_kz: string;
}
