import {connect} from "react-redux";
import AddDepartment from "./AddDepartment";
import {
    addDepartment,
    updateDepartmentNameKz,
    updateDepartmentNameRu
} from "../../../../redux/Reducers/DepartmentReducer";

let MapStateToProps = (state) => {
    return {
        departmentsDir: state.departmentsDir
    }
};

const AddDepartmentContainer = connect(MapStateToProps,
    {
        addDepartment,
        updateDepartmentNameRu,
        updateDepartmentNameKz,
    }
)(AddDepartment);

export default AddDepartmentContainer;