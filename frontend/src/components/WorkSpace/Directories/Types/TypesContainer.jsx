import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {deleteDirectoryRecordById, getDirectoryRecords} from "../../../../redux/reducers/DirectoriesReducer";
import {DirectoryNameEnum} from "../../../../api/directoriesAPI";
import {selectStatuses, selectStatusesIsFetching} from "../../../../redux/selectors/StatusSelector";

class TypesContainer extends React.Component {
    componentDidMount() {
        const {getDirectoryRecords} = this.props;

        getDirectoryRecords(DirectoryNameEnum.types);
    }

    render() {
        const {isAdmin, types, deleteDirectoryRecordById, isFetching} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.TYPES}
                isAdmin={isAdmin}
                directory={types}
                isFetching={isFetching}
                removeItemById={deleteDirectoryRecordById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        types: selectStatuses(state),
        isFetching: selectStatusesIsFetching(state)
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getDirectoryRecords,
        deleteDirectoryRecordById
    })
)(TypesContainer);
