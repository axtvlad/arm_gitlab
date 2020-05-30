import {connect} from "react-redux";
import {postRole, updateRoleNameKz, updateRoleNameRu} from "../../../../redux/Reducers/RoleReducer";
import AddRole from "./AddRole";
import React from "react";
import {Redirect} from "react-router-dom";

class AddRoleContainer extends React.Component {
    render() {
        if (this.props.rolesDir.isPosted) {
            return <Redirect to={'/roles'}/>
        }

        return (
            <AddRole {...this.props} />
        )
    }
}

let MapStateToProps = (state) => {
    return {
        rolesDir: state.rolesDir
    }
};

export default connect(MapStateToProps,
    {
        postRole,
        updateRoleNameRu,
        updateRoleNameKz,
    }
)(AddRoleContainer);