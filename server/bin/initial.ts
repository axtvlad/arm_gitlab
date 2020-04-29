import {getManager} from "typeorm";
import passwordHash from 'password-hash';
import {Users} from "../modules/users/UsersModel";
import {Roles} from "../modules/roles/RolesModel";
import {Statuses} from "../modules/statuses/StatusesModel";
import {Genders} from "../modules/genders/GendersModel";
import {Customers} from "../modules/customers/CustomersModel";
import {Cities} from "../modules/cities/CitiesModel";

export default class Initial {
    constructor() {
        this.checkUsers();
        this.checkRoles();
        this.checkStatuses();
        this.checkGenders();
        this.checkCustomers();
        this.checkCities();
    }

    async checkUsers() {
        const count = await getManager().getRepository(Users).count();

        if (!count) {
            const user = new Users();

            user.login = 'admin';
            user.password = passwordHash.generate('admin');

            user.firstName = 'Vladislav';
            user.lastName = 'Axt';
            user.email = 'new-life-2020@mail.ru';
            user.phone = 7473381815;

            user.locale = 'ru';
            user.role_id = 2;
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
            const status1 = new Statuses();
            const status2 = new Statuses();
            const status3 = new Statuses();

            status1.num = 1;
            status1.name_ru = 'Актуальный';
            status1.name_kz = 'Нақты';

            status2.num = 2;
            status2.name_ru = 'Утратил силу';
            status2.name_kz = 'Мерзімі біткен';

            status3.num = 3;
            status3.name_ru = 'Не вступил в силу';
            status3.name_kz = 'Күшіне енген жоқ';

            await getManager().getRepository(Statuses).save(status1);
            await getManager().getRepository(Statuses).save(status2);
            await getManager().getRepository(Statuses).save(status3);
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

    async checkCustomers() {
        const count = await getManager().getRepository(Customers).count();

        if (!count) {
            const customer = new Customers();

            customer.name_ru = 'ГККП "Политехнический колледж"';

            await getManager().getRepository(Customers).save(customer);
        }
    }

    async checkCities() {
        const count = await getManager().getRepository(Cities).count();

        if (!count) {
            const city = new Cities();

            city.name_ru = 'Нур-Султан';
            city.name_kz = 'Нур-Султан';

            await getManager().getRepository(Cities).save(city);
        }
    }
}
