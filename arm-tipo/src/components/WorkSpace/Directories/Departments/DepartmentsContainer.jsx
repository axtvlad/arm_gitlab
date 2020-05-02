import {connect} from "react-redux";
import {setDepartmentsCountCreator, setDepartmentsCreator} from "../../../../redux/Reducers/DepartmentReducer";
import React from "react";
import * as axios from "axios";
import Departments from "./Departments";
import {BASE_URL} from "../../../../env";

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

            axios
                .get(BASE_URL + '/departments', config)
                .then(response => {
                    this.props.setDepartments(response.data.data);
                    this.props.setDepartmentsCount(response.data.totalCount);
                    console.log('departments: ', response.data.data);
                });
        }
    }

    render() {
        return (
            <Departments departments={this.props.departments}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        departments: state.departmentsDir.departments
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setDepartments: (departments) => {
            dispatch(setDepartmentsCreator(departments))
        },
        setDepartmentsCount: (departmentsCount) => {
            dispatch(setDepartmentsCountCreator(departmentsCount))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsContainer);