import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Descriptions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 100, unique: true, update: true})
    name_ru: string;

    @Column({type: "varchar", length: 100, unique: true, update: true})
    name_kz: string;

    @Column({type: "varchar", length: 100})
    path: string;

    @Column({type: "varchar", length: 100, unique: true})
    f_name_ru: string;

    @Column({type: "varchar", length: 100, unique: true})
    f_name_kz: string;
}
