import {connect} from "react-redux";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {withRouter} from "react-router-dom";
import {getMainDocById} from "../../../../redux/reducers/MainDocReducer";
import React from "react";
import DisplayMainDoc from "./DisplayMainDoc";
import {compose} from "redux";
import {Spin} from "antd";
import {getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";
import {selectDepartments} from "../../../../redux/selectors/DepartmentSelector";
import {selectStatuses} from "../../../../redux/selectors/StatusSelector";
import {selectTypes} from "../../../../redux/selectors/TypeSelector";

class DisplayMainDocContainer extends React.Component {
    componentDidMount() {
        const {match, getMainDocById, getDirectoryRecords} = this.props;

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getMainDocById(id);

        getDirectoryRecords(DirectoryNameEnum.departments)
        getDirectoryRecords(DirectoryNameEnum.types)
        getDirectoryRecords(DirectoryNameEnum.statuses)
    }

    render() {
        const {currentMainDoc, departments, statuses, types, directory} = this.props;

        if (!departments || !statuses || !types) {
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
        departments: selectDepartments(state),
        statuses: selectStatuses(state),
        types: selectTypes(state)
    }
};

export default compose(
    connect(mapStateToProps, {
        getMainDocById,
        getDirectoryRecords
    }),
    withRouter
)(DisplayMainDocContainer);

