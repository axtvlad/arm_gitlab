import {connect} from "react-redux";
import {deleteDepartmentById, getDepartments} from "../../../../redux/Reducers/DepartmentReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {notification} from "antd";

class DepartmentsContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            !this.props.departments.length && this.props.getDepartments();
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
        return (
            <Directory
                type={DirectoriesTypes.DEPARTMENTS}
                isAdmin={this.props.isAdmin}
                directory={this.props.departments}
                isFetching={this.props.isFetching}
                removeItemById={this.props.deleteDepartmentById}
            />
        )
    }
}

let mapStateToProps = (state) => {
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