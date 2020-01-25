import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Faqs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 200, unique: true})
    question_ru: string;

    @Column({length: 200, default: null, unique: true})
    question_kz?: string;

    @Column({length: 2000})
    answer_ru: string;

    @Column({length: 2000, default: null})
    answer_kz?: string;
}
