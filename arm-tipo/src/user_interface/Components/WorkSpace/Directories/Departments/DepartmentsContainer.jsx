import {connect} from "react-redux";
import Departments from "./Departments";

let mapStateToProps = (state) => {
    return {
        departments: state.departmentsDir.departments
    }
};

const DepartmentsContainer = connect(mapStateToProps, null)(Departments);

export default DepartmentsContainer;