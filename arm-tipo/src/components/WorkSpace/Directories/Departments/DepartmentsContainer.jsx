import {connect} from "react-redux";
import {deleteDepartmentById, getDepartments} from "../../../../redux/Reducers/DepartmentReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {compose} from "redux";

class DepartmentsContainer extends React.Component {
    componentDidMount() {
        const {getDepartments} = this.props;

        getDepartments();
    }

    render() {
        const {isAdmin, departments, deleteDepartmentById, isFetching} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.DEPARTMENTS}
                isAdmin={isAdmin}
                directory={departments}
                isFetching={isFetching}
                removeItemById={deleteDepartmentById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        departments: state.departmentsDir.departments,
        isFetching: state.departmentsDir.isFetching
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps,
        {
            getDepartments,
            deleteDepartmentById
        })
)(DepartmentsContainer);