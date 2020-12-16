import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {connect} from "react-redux";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {deleteDirectoryRecordById, getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";
import {selectRoles, selectRolesIsFetching} from "../../../../redux/selectors/RoleSelector";

class RolesContainer extends React.Component {
    componentDidMount() {
        const {getDirectoryRecords} = this.props;

        getDirectoryRecords(DirectoryNameEnum.roles);
    }

    render() {
        const {isAdmin, roles, deleteDirectoryRecordById, isFetching} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.ROLES}
                isAdmin={isAdmin}
                directory={roles}
                isFetching={isFetching}
                removeItemById={deleteDirectoryRecordById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roles: selectRoles(state),
        isFetching: selectRolesIsFetching(state)
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getDirectoryRecords,
        deleteDirectoryRecordById
    })
)(RolesContainer);