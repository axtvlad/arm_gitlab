import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class OtherDocs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 150, unique: true})
    name_ru: string;

    @Column({length: 150, unique: true, default: null})
    name_kz?: string;

    @Column({length: 100})
    file_ru: string;

    @Column({length: 100, default: null})
    file_kz?: string;
}
