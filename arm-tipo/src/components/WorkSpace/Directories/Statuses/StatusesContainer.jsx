import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {deleteStatusById, getStatuses} from "../../../../redux/Reducers/StatusReducer";

class StatusesContainer extends React.Component {
    componentDidMount() {
        !this.props.statuses.length && this.props.getStatuses();
    }

    render() {
        return (
            <Directory
                type={DirectoriesTypes.STATUSES}
                isAdmin={this.props.isAdmin}
                directory={this.props.statuses}
                isFetching={this.props.isFetching}
                removeItemById={this.props.deleteStatusById}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        statuses: state.statusesDir.statuses,
        isFetching: state.statusesDir.isFetching,
        isAdmin: state.usersDir.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getStatuses,
        deleteStatusById
    }
)(StatusesContainer);
