import {connect} from "react-redux";
import {getDepartments} from "../../../../redux/Reducers/DepartmentReducer";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";

class DepartmentsContainer extends React.Component {
    componentDidMount() {
        !this.props.departments.length && this.props.getDepartments();
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
        getDepartments
    }
)(DepartmentsContainer);