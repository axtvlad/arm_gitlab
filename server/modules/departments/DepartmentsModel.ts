import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Departments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name_ru: string;

    @Column({unique: true})
    name_kz: string;
}
