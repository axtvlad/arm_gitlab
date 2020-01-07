import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class OtherDocs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 150, unique: true, update: true})
    name_ru: string;

    @Column({type: "varchar", length: 150, unique: true, update: true})
    name_kz: string;

    @Column({type: "varchar", length: 100})
    path_ru: string;

    @Column({type: "varchar", length: 100})
    path_kz: string;

    @Column({type: "varchar", length: 100, unique: true})
    f_name_ru: string;

    @Column({type: "varchar", length: 100, unique: true})
    f_name_kz: string;
}
