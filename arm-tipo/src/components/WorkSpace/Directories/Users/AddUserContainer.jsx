import {
    addUser,
    updateUserBirthAt,
    updateUserCityId,
    updateUserCustomerId,
    updateUserEmail,
    updateUserFirstName,
    updateUserGenderId,
    updateUserIsAdmin,
    updateUserIsBanned,
    updateUserIsPremium,
    updateUserLastName,
    updateUserLocale,
    updateUserLogin,
    updateUserPassword,
    updateUserPatronymic,
    updateUserPhone,
    updateUserPhoto,
    updateUserRoleId
} from "../../../../redux/Reducers/UserReducer";
import {connect} from "react-redux";
import AddUser from "./AddUser";

let mapStateToProps = (state) => {
    return {
        usersDir: state.usersDir,
        roles: state.rolesDir.roles,
        cities: state.citiesDir.cities,
        customers: state.customersDir.customers,
        genders: state.gendersDir.genders
    }
};

const AddUserContainer = connect(mapStateToProps,
    {
        addUser,
        updateUserFirstName,
        updateUserLastName,
        updateUserPatronymic,
        updateUserLogin,
        updateUserPassword,
        updateUserEmail,
        updateUserPhoto,
        updateUserRoleId,
        updateUserCityId,
        updateUserCustomerId,
        updateUserGenderId,
        updateUserPhone,
        updateUserLocale,
        updateUserBirthAt,
        updateUserIsAdmin,
        updateUserIsBanned,
        updateUserIsPremium
    }
)(AddUser);

export default AddUserContainer;