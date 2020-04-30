import {connect} from "react-redux";
import Roles from "./Roles";
import {setRolesCreator} from "../../../../../redux/Reducers/RoleReducer";

let mapStateToProps = (state) => {
    return {
        roles: state.rolesDir.roles
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setRoles: (roles) => {
            dispatch(setRolesCreator(roles))
        }
    }
};

const RolesContainer = connect(mapStateToProps, mapDispatchToProps)(Roles);

export default RolesContainer;