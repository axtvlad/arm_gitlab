import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getDepartmentById, updateDepartment} from "../../../../redux/Reducers/DepartmentReducer";
import DisplayDirectory from "../../../common/commonComponents/DisplayDirectory";
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
        const {isFetching, currentItem, updateDepartment, type} = this.props;

        return (
            <DisplayDirectory
                isFetching={isFetching}
                currentItem={currentItem}
                type={type}
                onSubmit={updateDepartment}
            />
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
        getDepartmentById,
        updateDepartment
    }),
    withRouter
)(DisplayDepartmentContainer)