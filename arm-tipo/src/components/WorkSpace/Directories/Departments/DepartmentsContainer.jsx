import {connect} from "react-redux";
import {
    setDepartments,
    setDepartmentsCount,
    setDepartmentsIsFetching
} from "../../../../redux/Reducers/DepartmentReducer";
import React from "react";
import * as axios from "axios";
import {BASE_URL} from "../../../../env";
import Directory from "../../../common/Directory";
import {setIsAdmin} from "../../../../redux/Reducers/UserReducer";
import {DirectoriesTypes} from "../../../common/support/DirectoriesTypes";

class DepartmentsContainer extends React.Component {
    componentDidMount() {
        if (this.props.departments.length === 0) {
            const user = "Admin";
            const pass = "admin";

            const authorizationBasic = window.btoa(user + ':' + pass);
            const config = {
                "headers": {
                    "Authorization": "Basic " + authorizationBasic
                }
            };

            this.props.setDepartmentsIsFetching(true);

            axios
                .get(BASE_URL + '/departments', config)
                .then(response => {
                    this.props.setDepartments(response.data.data);
                    this.props.setDepartmentsCount(response.data.totalCount);

                    console.log('departments: ', response.data.data);

                    this.props.setDepartmentsIsFetching(false);
                });
        }
    }

    render() {
        return (
            <Directory
                type={DirectoriesTypes.DEPARTMENTS}
                isAdmin={this.props.isAdmin}
                directory={this.props.departments}
                isFetching={this.props.isFetching}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        departments: state.departmentsDir.departments,
        isFetching: state.departmentsDir.isFetching,
        isAdmin: state.usersDir.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        setDepartments,
        setDepartmentsCount,
        setDepartmentsIsFetching,
        setIsAdmin
    }
)(DepartmentsContainer);