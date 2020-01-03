import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Templates {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name_ru: string;

    @Column({unique: true})
    name_kz: string;

    @Column()
    category_id: number;

    @Column()
    path_ru: string;

    @Column()
    path_kz: string;

    @Column()
    f_name_ru: string;

    @Column()
    f_name_kz: string;
}
