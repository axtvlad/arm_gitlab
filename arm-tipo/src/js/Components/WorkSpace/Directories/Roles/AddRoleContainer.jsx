import {connect} from "react-redux";
import AddRole from "./AddRole";
import {
    addRoleCreator,
    updateRoleNameKzCreator,
    updateRoleNameRuCreator
} from "../../../../../redux/Reducers/RolesReducer";

let MapStateToProps = (state) => {
    return {
        rolesDir: state.rolesDir
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        addRole: () => {
            dispatch(addRoleCreator());
        },
        updateRoleNameRu: (name_ru) => {
            dispatch(updateRoleNameRuCreator(name_ru));
        },
        updateRoleNameKz: (name_kz) => {
            dispatch(updateRoleNameKzCreator(name_kz));
        },
    }
};

const AddRoleContainer = connect(MapStateToProps, MapDispatchToProps)(AddRole);

export default AddRoleContainer;