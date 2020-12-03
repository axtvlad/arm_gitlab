import {connect} from "react-redux";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {withRouter} from "react-router-dom";
import {getTypes} from "../../../../redux/Reducers/TypeReducer";
import {getStatuses} from "../../../../redux/Reducers/StatusReducer";
import {getDepartments} from "../../../../redux/Reducers/DepartmentReducer";
import {getMainDocById} from "../../../../redux/Reducers/MainDocReducer";
import React from "react";
import {Spin} from "antd";
import DisplayMainDoc from "./DisplayMainDoc";
import {compose} from "redux";

class DisplayMainDocContainer extends React.Component {
    componentDidMount() {
        const {departments, getDepartments, statuses, types, getStatuses, getTypes, match, getMainDocById} = this.props;
        !departments.length && getDepartments();
        !statuses.length && getStatuses();
        !types.length && getTypes();

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getMainDocById(id);
    }


    render() {
        const {departments, statuses, types, currentMainDoc} = this.props;

        if (!currentMainDoc
            || !departments.length
            || !statuses.length
            || !types.length) {
            return <Spin/>
        } else {
            return (
                <DisplayMainDoc {...this.props}/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        directory: GetDirectory(DirectoriesTypes.MAIN_DOCS),
        currentMainDoc: state.mainDocsDir.currentMainDoc,
        departments: state.departmentsDir.departments,
        statuses: state.statusesDir.statuses,
        types: state.typesDir.types,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default compose(
    connect(mapStateToProps, {
        getMainDocById,
        getDepartments,
        getStatuses,
        getTypes
    }),
    withRouter
)(DisplayMainDocContainer);

