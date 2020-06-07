import {connect} from "react-redux";
import {
    postMainDoc,
    updateMainDocBeginDate,
    updateMainDocDepartmentId,
    updateMainDocDescriptionKz,
    updateMainDocDescriptionRu,
    updateMainDocFileKz,
    updateMainDocFileRu,
    updateMainDocFinishDate,
    updateMainDocHeaderKz,
    updateMainDocHeaderRu,
    updateMainDocNameKz,
    updateMainDocNameRu,
    updateMainDocNum,
    updateMainDocPubDate,
    updateMainDocStatusId,
    updateMainDocTags,
    updateMainDocTextKz,
    updateMainDocTextRu,
    updateMainDocTypeId
} from "../../../../redux/Reducers/MainDocReducer";
import {getTypes} from "../../../../redux/Reducers/TypeReducer";
import {getDepartments} from "../../../../redux/Reducers/DepartmentReducer";
import {getStatuses} from "../../../../redux/Reducers/StatusReducer";
import AddMainDoc from "./AddMainDoc";
import React from "react";
import {Redirect} from "react-router-dom";

class AddMainDocContainer extends React.Component {
    componentDidMount() {
        !this.props.types.length && this.props.getTypes();
        !this.props.departments.length && this.props.getDepartments();
        !this.props.statuses.length && this.props.getStatuses();
        this.props.updateMainDocPubDate();

    }

    render() {
        if (this.props.mainDocsDir.isPosted) {
            return <Redirect to={'/mainDocs'}/>
        }

        return (
            <AddMainDoc {...this.props} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        mainDocsDir: state.mainDocsDir,
        types: state.typesDir.types,
        departments: state.departmentsDir.departments,
        statuses: state.statusesDir.statuses
    }
};

export default connect(mapStateToProps,
    {
        postMainDoc,
        getTypes,
        getDepartments,
        getStatuses,
        updateMainDocNum,
        updateMainDocNameRu,
        updateMainDocNameKz,
        updateMainDocDepartmentId,
        updateMainDocStatusId,
        updateMainDocBeginDate,
        updateMainDocFinishDate,
        updateMainDocPubDate,
        updateMainDocHeaderRu,
        updateMainDocHeaderKz,
        updateMainDocFileRu,
        updateMainDocFileKz,
        updateMainDocDescriptionRu,
        updateMainDocDescriptionKz,
        updateMainDocTypeId,
        updateMainDocTextRu,
        updateMainDocTextKz,
        updateMainDocTags
    }
)(AddMainDocContainer);