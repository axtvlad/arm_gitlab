import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DisplayDirectory from "../../../common/commonComponents/DisplayDirectory";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {getDirectoryRecordById, updateDirectoryRecordById} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";

class DisplayCustomerContainer extends React.Component {
    componentDidMount() {
        const {match, getDirectoryRecordById} = this.props;

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getDirectoryRecordById(DirectoryNameEnum.customers, id)
    }

    render() {
        const {currentItem, type, updateDirectoryRecordById} = this.props;

        return (
            <DisplayDirectory
                currentItem={currentItem}
                type={type}
                onSubmit={updateDirectoryRecordById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.CUSTOMERS),
        currentItem: state.directories.currentDirectoryRecord,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getDirectoryRecordById,
        updateDirectoryRecordById,
    }),
    withRouter
)(DisplayCustomerContainer);