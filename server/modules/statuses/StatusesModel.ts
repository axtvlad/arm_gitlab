import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Statuses {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name_ru: string;

    @Column({unique: true})
    name_kz: string;
}
