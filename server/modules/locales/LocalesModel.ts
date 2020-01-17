import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Locales {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 50, unique: true, update: true})
    name: string;
}
