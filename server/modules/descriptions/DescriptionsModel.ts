import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Descriptions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, unique: true})
    name_ru: string;

    @Column({length: 100, default: null})
    name_kz?: string;

    @Column({length: 100})
    file_ru: string;

    @Column({length: 100})
    file_kz?: string;
}
