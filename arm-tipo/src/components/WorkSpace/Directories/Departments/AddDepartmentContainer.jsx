import {connect} from "react-redux";
import AddDepartment from "./AddDepartment";
import {
    postDepartment,
    updateDepartmentNameKz,
    updateDepartmentNameRu
} from "../../../../redux/Reducers/DepartmentReducer";
import React from "react";
import {Redirect} from "react-router-dom";

class AddDepartmentContainer extends React.Component {
    render() {
        if (this.props.departmentsDir.isPosted) {
            return <Redirect to={'/departments'}/>
        }

        return (
            <AddDepartment {...this.props}/>
        )
    }
}

let MapStateToProps = (state) => {
    return {
        departmentsDir: state.departmentsDir
    }
};

export default connect(MapStateToProps,
    {
        postDepartment,
        updateDepartmentNameRu,
        updateDepartmentNameKz,
    }
)(AddDepartmentContainer);