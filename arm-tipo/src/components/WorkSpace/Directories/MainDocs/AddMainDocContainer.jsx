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
import {notification, Spin} from "antd";

class AddMainDocContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, types, departments, statuses, getTypes, getDepartments, getStatuses, updateMainDocPubDate} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            !types.length && getTypes();
            !departments.length && getDepartments();
            !statuses.length && getStatuses();

            updateMainDocPubDate();
        }
    }

    error() {
        notification['error']({
            message: 'У вас нет прав!',
            description: 'У вас нет прав, чтобы просматривать данный модуль!',
            placement: 'bottomRight'
        })
    }

    render() {
        const {isAdmin, mainDocsDir} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            if (mainDocsDir.isPosted) {
                return <Redirect to={'/mainDocs'}/>
            } else {
                return (
                    <AddMainDoc {...this.props} />
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        mainDocsDir: state.mainDocsDir,
        types: state.typesDir.types,
        departments: state.departmentsDir.departments,
        statuses: state.statusesDir.statuses,
        isAdmin: state.authDir.userData.isAdmin
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