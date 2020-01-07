import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Faqs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 200, unique: true, update: true})
    question_ru: string;

    @Column({type: "varchar", length: 200, unique: true, update: true})
    question_kz: string;

    @Column({type: "varchar", length: 2000, update: true})
    answer_ru: string;

    @Column({type: "varchar", length: 2000, update: true})
    answer_kz: string;
}
