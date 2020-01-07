import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 100, unique: true, update: true})
    name_ru: string;

    @Column({type: "varchar", length: 100, unique: true, update: true})
    name_kz: string;
}
