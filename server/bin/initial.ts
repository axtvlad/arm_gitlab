import {getManager} from "typeorm";
import passwordHash from 'password-hash';
import {Users} from "../modules/users/UsersModel";
import {Roles} from "../modules/roles/RolesModel";

export default class Initial {
    constructor(){
        this.checkUsers();
        this.checkRoles();
    }

    async checkUsers(){
        const count = await getManager().getRepository(Users).count();

        if(!count){
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

    async checkRoles(){
        const count = await getManager().getRepository(Users).count();

        if(!count){
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

            await getManager().getRepository(Users).save(role1);
            await getManager().getRepository(Users).save(role2);
            await getManager().getRepository(Users).save(role3);
        }
    }
}
