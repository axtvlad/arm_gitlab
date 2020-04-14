import {connect} from "react-redux";
import AddDepartment from "./AddDepartment";
import {
    addDepartmentCreator,
    updateDepartmentNameKzCreator,
    updateDepartmentNameRuCreator
} from "../../../../../redux/Reducers/DepartmentReducer";

let MapStateToProps = (state) => {
    return {
        departmentsDir: state.departmentsDir
    }
};

let MapDispatchToProps = (dispatch) => {
    return {
        addDepartment: () => {
            dispatch(addDepartmentCreator());
        },
        updateDepartmentNameRu: (ru) => {
            dispatch(updateDepartmentNameRuCreator(ru));
        },
        updateDepartmentNameKz: (kz) => {
            dispatch(updateDepartmentNameKzCreator(kz));
        },
    }
};

const AddDepartmentContainer = connect(MapStateToProps, MapDispatchToProps)(AddDepartment);

export default AddDepartmentContainer;