import {connect} from "react-redux";
import AddRole from "./AddRole";
import {addRole, updateRoleNameKz, updateRoleNameRu} from "../../../../redux/Reducers/RoleReducer";

let MapStateToProps = (state) => {
    return {
        rolesDir: state.rolesDir
    }
};

const AddRoleContainer = connect(MapStateToProps,
    {
        addRole,
        updateRoleNameRu,
        updateRoleNameKz,
    }
)(AddRole);

export default AddRoleContainer;