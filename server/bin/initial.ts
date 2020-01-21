import {getManager} from "typeorm";
import passwordHash from 'password-hash';
import {Users} from "../modules/users/UsersModel";

export default class Initial {
    constructor(){
        this.checkUsers();
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
}
