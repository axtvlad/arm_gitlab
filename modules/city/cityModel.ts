import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_ru: string;

    @Column()
    name_kz: string;
}
