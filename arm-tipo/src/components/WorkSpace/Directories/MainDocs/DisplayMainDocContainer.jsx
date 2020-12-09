import {connect} from "react-redux";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {withRouter} from "react-router-dom";
import {getTypes} from "../../../../redux/Reducers/TypeReducer";
import {getStatuses} from "../../../../redux/Reducers/StatusReducer";
import {getDepartments} from "../../../../redux/Reducers/DepartmentReducer";
import {getMainDocById} from "../../../../redux/Reducers/MainDocReducer";
import React from "react";
import DisplayMainDoc from "./DisplayMainDoc";
import {compose} from "redux";

// todo зарефакторить

class DisplayMainDocContainer extends React.Component {
    componentDidMount() {
        const {getDepartments, getStatuses, getTypes, match, getMainDocById} = this.props;

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getMainDocById(id);
        getDepartments();
        getStatuses();
        getTypes();
    }

    render() {
        const {currentMainDoc, departments, statuses, types, directory} = this.props;

        return (
            <DisplayMainDoc
                currentMainDoc={currentMainDoc}
                departments={departments}
                statuses={statuses}
                types={types}
                directory={directory}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        directory: GetDirectory(DirectoriesTypes.MAIN_DOCS),
        currentMainDoc: state.mainDocsDir.currentMainDoc,
        departments: state.departmentsDir.departments,
        statuses: state.statusesDir.statuses,
        types: state.typesDir.types,
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

