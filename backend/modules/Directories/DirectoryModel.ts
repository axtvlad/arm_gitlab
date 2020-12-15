import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export class Directory {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100, unique: true})
    name_ru: string

    @Column({length: 100, unique: true})
    name_kz: string
}

@Entity()
export class Categories extends Directory {
}

@Entity()
export class Customers extends Directory {
}

@Entity()
export class Departments extends Directory {
}

@Entity()
export class Genders extends Directory {
}

@Entity()
export class Roles extends Directory {
}

@Entity()
export class Statuses extends Directory {
}

@Entity()
export class Types extends Directory {
}

@Entity()
export class Cities extends Directory {
}