import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {deleteStatusById, getStatuses} from "../../../../redux/Reducers/StatusReducer";
import {notification, Spin} from "antd";

class StatusesContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            !this.props.statuses.length && this.props.getStatuses();
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
        if (!this.props.isAdmin) {
            return <Spin/>
        } else {
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
}

let mapStateToProps = (state) => {
    return {
        statuses: state.statusesDir.statuses,
        isFetching: state.statusesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        getStatuses,
        deleteStatusById
    }
)(StatusesContainer);
