import {connect} from "react-redux";
import React from "react";
import Directory from "../../../common/commonComponents/Directory";
import {DirectoriesTypes} from "../../../common/utils/DirectoriesTypes";
import {deleteStatusById, getStatuses} from "../../../../redux/Reducers/StatusReducer";
import {notification, Spin} from "antd";

class StatusesContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, statuses, getStatuses} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            !statuses.length && getStatuses();
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
        const {isAdmin, statuses, deleteStatusById, isFetching} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
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
}

const mapStateToProps = (state) => {
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
