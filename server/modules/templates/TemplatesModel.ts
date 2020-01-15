import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Categories} from "../categories/CategoriesModel";

@Entity()
export class Templates {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 150, unique: true, update: true})
    name_ru: string;

    @Column({type: "varchar", length: 150, unique: true, update: true})
    name_kz: string;

    @OneToOne(type => Categories)
    @Column({type: "int", precision: 3, update: true})
    category_id: number;

    @Column({type: "varchar", length: 100})
    path: string;

    @Column({type: "varchar", length: 100, unique: true})
    f_name_ru: string;

    @Column({type: "varchar", length: 100, unique: true})
    f_name_kz: string;
}
