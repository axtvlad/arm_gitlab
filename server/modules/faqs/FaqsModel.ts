import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Faqs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    question_ru: string;

    @Column({unique: true})
    question_kz: string;

    @Column()
    answer_ru: string;

    @Column()
    answer_kz: string;
}
