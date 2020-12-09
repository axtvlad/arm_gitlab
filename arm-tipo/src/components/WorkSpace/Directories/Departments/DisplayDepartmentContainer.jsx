import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getDepartmentById} from "../../../../redux/Reducers/DepartmentReducer";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class DisplayDepartmentContainer extends React.Component {
    componentDidMount() {
        const {match, getDepartmentById} = this.props;

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getDepartmentById(id);
    }

    render() {
        return (
            <DisplayDirectoryItem {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.DEPARTMENTS),
        currentItem: state.departmentsDir.currentDepartment,
        isFetching: state.departmentsDir.isFetching
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getDepartmentById
    }),
    withRouter
)(DisplayDepartmentContainer)