import {connect} from "react-redux";
import Departments from "./Departments";
import {setDepartmentsCreator} from "../../../../../redux/Reducers/DepartmentReducer";

let mapStateToProps = (state) => {
    return {
        departments: state.departmentsDir.departments
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setDepartments: (departments) => {
            dispatch(setDepartmentsCreator(departments))
        }
    }
};

const DepartmentsContainer = connect(mapStateToProps, mapDispatchToProps)(Departments);

export default DepartmentsContainer;