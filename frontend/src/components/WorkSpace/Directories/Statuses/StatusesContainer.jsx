import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {compose} from "redux";
import {deleteDirectoryRecordById, getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";
import {selectStatuses, selectStatusesIsFetching} from "../../../../redux/selectors/StatusSelector";

class StatusesContainer extends React.Component {
    componentDidMount() {
        const {getDirectoryRecords} = this.props;

        getDirectoryRecords(DirectoryNameEnum.statuses);
    }

    render() {
        const {isAdmin, statuses, deleteDirectoryRecordById, isFetching} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.STATUSES}
                isAdmin={isAdmin}
                directory={statuses}
                isFetching={isFetching}
                removeItemById={deleteDirectoryRecordById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        statuses: selectStatuses(state),
        isFetching: selectStatusesIsFetching(state)
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getDirectoryRecords,
        deleteDirectoryRecordById
    })
)(StatusesContainer);
