import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {compose} from "redux";
import {deleteDirectoryRecordById, getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";
import {selectDepartments, selectDepartmentsIsFetching} from "../../../../redux/selectors/DepartmentSelector";

class DepartmentsContainer extends React.Component {
    componentDidMount() {
        const {getDirectoryRecords} = this.props;

        getDirectoryRecords(DirectoryNameEnum.departments);
    }

    render() {
        const {isAdmin, departments, deleteDirectoryRecordById, isFetching} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.DEPARTMENTS}
                isAdmin={isAdmin}
                directory={departments}
                isFetching={isFetching}
                removeItemById={deleteDirectoryRecordById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        departments: selectDepartments(state),
        isFetching: selectDepartmentsIsFetching(state)
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getDirectoryRecords,
        deleteDirectoryRecordById
    })
)(DepartmentsContainer);