import {connect} from "react-redux";
import {postMainDoc} from "../../../../redux/reducers/MainDocReducer";
import AddMainDoc from "./AddMainDoc";
import React from "react";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";
import {getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {selectTypes} from "../../../../redux/selectors/TypeSelector";
import {selectDepartments} from "../../../../redux/selectors/DepartmentSelector";
import {selectStatuses} from "../../../../redux/selectors/StatusSelector";

class AddMainDocContainer extends React.Component {
    componentDidMount() {
        const {getDirectoryRecords} = this.props;

        getDirectoryRecords(DirectoryNameEnum.types)
        getDirectoryRecords(DirectoryNameEnum.statuses)
        getDirectoryRecords(DirectoryNameEnum.departments)
    }

    render() {
        const {types, departments, statuses, postMainDoc} = this.props;

        return (
            <AddMainDoc types={types} departments={departments} statuses={statuses} postMainDoc={postMainDoc}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        types: selectTypes(state),
        departments: selectDepartments(state),
        statuses: selectStatuses(state)
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        postMainDoc,
        getDirectoryRecords
    })
)(AddMainDocContainer);