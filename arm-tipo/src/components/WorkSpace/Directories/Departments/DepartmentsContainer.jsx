import {connect} from "react-redux";
import {
    setDepartments,
    setDepartmentsCount,
    setDepartmentsIsFetching
} from "../../../../redux/Reducers/DepartmentReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {setIsAdmin} from "../../../../redux/Reducers/UserReducer";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {systemAPI} from "../../../../api/API";

class DepartmentsContainer extends React.Component {
    componentDidMount() {
        if (this.props.departments.length === 0) {

            this.props.setDepartmentsIsFetching(true);

            systemAPI.departments.getDepartments()
                .then(response => {
                    this.props.setDepartments(response.data);
                    this.props.setDepartmentsCount(response.totalCount);

                    console.log('departments: ', response.data);

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