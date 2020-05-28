import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getDepartmentById} from "../../../../redux/Reducers/DepartmentReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";

class DisplayDepartmentContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;

        if (!id) {
            id = 1
        }

        this.props.getDepartmentById(id);
    }

    render() {
        return (
            <DisplayDirectoryItem {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.DEPARTMENTS),
        currentItem: state.departmentsDir.currentDepartment,
        isFetching: state.departmentsDir.isFetching
    }
};

let DepartmentContainerUrl = withRouter(DisplayDepartmentContainer);

export default connect(mapStateToProps,
    {
        getDepartmentById
    }
)(DepartmentContainerUrl)