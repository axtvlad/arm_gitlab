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
import {Spin} from "antd";

class DisplayMainDocContainer extends React.Component {
    componentDidMount() {
        const {match, getMainDocById, getDepartments, getTypes, getStatuses} = this.props;

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getMainDocById(id);

        getDepartments();
        getTypes()
        getStatuses()
    }

    render() {
        const {currentMainDoc, departments, statuses, types, directory} = this.props;

        if (departments.length === 0 || statuses.length === 0 || types.length === 0) {
            return <Spin/>
        }

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

