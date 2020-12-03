import {connect} from "react-redux";
import {deleteDepartmentById, getDepartments} from "../../../../redux/Reducers/DepartmentReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {notification} from "antd";

class DepartmentsContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, departments, getDepartments} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            !departments.length && getDepartments();
        }
    }

    error() {
        notification['error']({
            message: 'У вас нет прав!',
            description: 'У вас нет прав, чтобы просматривать данный модуль!',
            placement: 'bottomRight'
        })
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
        isFetching: state.departmentsDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getDepartments,
        deleteDepartmentById
    }
)(DepartmentsContainer);