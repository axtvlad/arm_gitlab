import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DisplayDirectory from "../../../common/commonComponents/DisplayDirectory";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getStatusById, updateStatus} from "../../../../redux/Reducers/StatusReducer";
import {compose} from "redux";
import {isAdminRedirect} from "../../../../hoc/isAdminRedirect";

class DisplayStatusContainer extends React.Component {
    componentDidMount() {
        const {match, getStatusById} = this.props;

        let id = match.params.id;

        if (!id) {
            id = 1
        }

        getStatusById(id)
    }

    render() {
        const {isFetching, currentItem, updateStatus, type} = this.props;

        return (
            <DisplayDirectory
                isFetching={isFetching}
                currentItem={currentItem}
                type={type}
                onSubmit={updateStatus}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.STATUSES),
        currentItem: state.statusesDir.currentStatus,
        isFetching: state.statusesDir.isFetching,
    }
};

export default compose(
    isAdminRedirect,
    connect(mapStateToProps, {
        getStatusById,
        updateStatus
    }),
    withRouter
)(DisplayStatusContainer);