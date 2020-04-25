import {connect} from "react-redux";
import Roles from "./Roles";

let mapStateToProps = (state) => {
    return {
        roles: state.rolesDir.roles
    }
};

const RolesContainer = connect(mapStateToProps, null)(Roles);

export default RolesContainer;