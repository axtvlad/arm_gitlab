import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 50, unique: true, update: true})
    name_ru: string;

    @Column({type: "varchar", length: 50, unique: true, update: true})
    name_kz: string;
}
