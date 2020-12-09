import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {deleteStatusById, getStatuses} from "../../../../redux/Reducers/StatusReducer";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";
import {compose} from "redux";

class StatusesContainer extends React.Component {
    componentDidMount() {
        const {getStatuses} = this.props;

        getStatuses();
    }

    render() {
        const {isAdmin, statuses, deleteStatusById, isFetching} = this.props;

        return (
            <Directory
                type={DirectoriesTypes.STATUSES}
                isAdmin={isAdmin}
                directory={statuses}
                isFetching={isFetching}
                removeItemById={deleteStatusById}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        statuses: state.statusesDir.statuses,
        isFetching: state.statusesDir.isFetching,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getStatuses,
        deleteStatusById
    })
)(StatusesContainer);
