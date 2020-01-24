import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Templates {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 150, unique: true})
    name_ru: string;

    @Column({length: 150, unique: true})
    name_kz: string;

    @Column({precision: 3})
    category_id: number;

    @Column({length: 100})
    file_ru: string;

     @Column({length: 100, default: null})
    file_kz?: string;
}
