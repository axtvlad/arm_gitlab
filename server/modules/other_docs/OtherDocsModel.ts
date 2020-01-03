import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class OtherDocs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name_ru: string;

    @Column({unique: true})
    name_kz: string;

    @Column()
    path_ru: string;

    @Column()
    path_kz: string;

    @Column()
    f_name_ru: string;

    @Column()
    f_name_kz: string;

    @Column()
    author_id: number;
}
