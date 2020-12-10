import {connect} from "react-redux";
import React from "react";
import {withRouter} from "react-router-dom";
import DisplayDirectory from "../../../common/commonComponents/DisplayDirectory";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getRoleById} from "../../../../redux/Reducers/RoleReducer";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class DisplayRoleContainer extends React.Component {
    componentDidMount() {
        const {match, getRoleById} = this.props;

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getRoleById(id);
    }

    render() {
        return (
            <DisplayDirectory {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.ROLES),
        currentItem: state.rolesDir.currentRole,
        isFetching: state.rolesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getRoleById
    }),
    withRouter
)(DisplayRoleContainer);