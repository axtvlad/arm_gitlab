import {getManager} from "typeorm";
import passwordHash from 'password-hash';
import {Users} from "../modules/users/UsersModel";
import {Roles} from "../modules/roles/RolesModel";
import {Statuses} from "../modules/statuses/StatusesModel";
import {Genders} from "../modules/genders/GendersModel";

export default class Initial {
    constructor() {
        this.checkUsers();
        this.checkRoles();
        this.checkStatuses();
        this.checkGenders();
    }

    async checkUsers() {
        const count = await getManager().getRepository(Users).count();

        if (!count) {
            const user = new Users();

            user.login = 'admin';
            user.password = passwordHash.generate('admin');

            user.firstName = 'Admin';
            user.lastName = 'Admin';
            user.email = 'admin@example.com';

            user.isPremium = true;
            user.isAdmin = true;

            await getManager().getRepository(Users).save(user);
        }
    }

    async checkRoles() {
        const count = await getManager().getRepository(Roles).count();

        if (!count) {
            const role1 = new Roles();
            const role2 = new Roles();
            const role3 = new Roles();

            role1.num = 1;
            role1.name_ru = 'Пользователь';
            role1.name_kz = 'Пайдаланушы';

            role2.num = 2;
            role2.name_ru = 'Администратор';
            role2.name_kz = 'Әкімші';

            role3.num = 3;
            role3.name_ru = 'Эксперт';
            role3.name_kz = 'Эксперт';

            await getManager().getRepository(Roles).save(role1);
            await getManager().getRepository(Roles).save(role2);
            await getManager().getRepository(Roles).save(role3);
        }
    }

    async checkStatuses() {
        const count = await getManager().getRepository(Statuses).count();

        if (!count) {
            const status = new Statuses();

            status.num = 1;
            status.name_ru = 'Активный';
            status.name_kz = 'Белсенді';

            await getManager().getRepository(Statuses).save(status);
        }
    }

    async checkGenders() {
        const count = await getManager().getRepository(Genders).count();

        if (!count) {
            const gender1 = new Genders();
            const gender2 = new Genders();

            gender1.num = 1;
            gender1.name_ru = 'Мужчина';
            gender1.name_kz = 'Ер';

            gender2.num = 2;
            gender2.name_ru = 'Женщина';
            gender2.name_kz = 'Әйел';

            await getManager().getRepository(Genders).save(gender1);
            await getManager().getRepository(Genders).save(gender2);
        }
    }
}
