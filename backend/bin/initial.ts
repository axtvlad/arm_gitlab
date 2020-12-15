import {getManager} from "typeorm";
import passwordHash from 'password-hash';
import {Users} from "../modules/users/UsersModel";
import {
    Categories,
    Cities,
    Customers,
    Departments,
    Genders,
    Roles,
    Statuses,
    Types
} from "../modules/Directories/DirectoryModel";

export default class Initial {
    constructor() {
        this.checkUsers();
        this.checkRoles();
        this.checkStatuses();
        this.checkGenders();
        this.checkCustomers();
        this.checkCities();
        this.checkCategories();
        this.checkDepartments();
        this.checkTypes();
    }

    async checkUsers() {
        const count = await getManager().getRepository(Users).count();

        if (!count) {
            const user = new Users();

            user.login = 'axtvlad';
            user.password = passwordHash.generate('Axt28vlad');

            user.firstName = 'Vladislav';
            user.lastName = 'Axt';
            user.patronymic = 'Vadimovich';

            user.email = 'new-life-2020@mail.ru';
            user.phone = 7473381815;
            user.city_id = 1;
            user.gender_id = 1;
            user.customer_id = 1;

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

            role1.name_ru = 'Пользователь';
            role1.name_kz = 'Пайдаланушы';

            role2.name_ru = 'Администратор';
            role2.name_kz = 'Әкімші';

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

            status1.name_ru = 'Актуальный';
            status1.name_kz = 'Нақты';

            status2.name_ru = 'Утратил силу';
            status2.name_kz = 'Мерзімі біткен';

            status3.name_ru = 'Не вступил в силу';
            status3.name_kz = 'Күшіне енген жоқ';

            await getManager().getRepository(Statuses).save(status1);
            await getManager().getRepository(Statuses).save(status2);
            await getManager().getRepository(Statuses).save(status3);
        }
    }

    async checkCategories() {
        const count = await getManager().getRepository(Categories).count();

        if (!count) {
            const category1 = new Categories();
            const category2 = new Categories();

            category1.name_ru = 'Объясниетельная';
            category1.name_kz = 'Түсіндірме';

            category2.name_ru = 'Приказ';
            category2.name_kz = 'Бұйрық';

            await getManager().getRepository(Categories).save(category1);
            await getManager().getRepository(Categories).save(category2);
        }
    }

    async checkGenders() {
        const count = await getManager().getRepository(Genders).count();

        if (!count) {
            const gender1 = new Genders();
            const gender2 = new Genders();

            gender1.name_ru = 'Мужчина';
            gender1.name_kz = 'Ер';

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

            customer.name_ru = 'Astana Polytechnic College';
            customer.name_kz = 'Astana Polytechnic College';

            await getManager().getRepository(Customers).save(customer);
        }
    }

    async checkCities() {
        const count = await getManager().getRepository(Cities).count();

        if (!count) {
            const city = new Cities();

            city.name_ru = 'Нур-Султан';
            city.name_kz = 'Нұр-Сұлтан';

            await getManager().getRepository(Cities).save(city);
        }
    }

    async checkDepartments() {
        const count = await getManager().getRepository(Departments).count();

        if (!count) {
            const department = new Departments();

            department.name_ru = 'МОН РК';
            department.name_kz = 'ҚР БҒМ';

            await getManager().getRepository(Departments).save(department);
        }
    }

    async checkTypes() {
        const count = await getManager().getRepository(Types).count();

        if (!count) {
            const type1 = new Types();
            const type2 = new Types();

            type1.name_ru = 'Приказ';
            type1.name_kz = 'Бұйрық';

            type2.name_ru = 'Постановление';
            type2.name_kz = 'Қаулы';

            await getManager().getRepository(Types).save(type1);
            await getManager().getRepository(Types).save(type2);
        }
    }
}
