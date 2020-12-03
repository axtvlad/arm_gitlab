import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getStatusById} from "../../../../redux/Reducers/StatusReducer";
import {notification, Spin} from "antd";
import {compose} from "redux";

class DisplayStatusContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, match, getStatusById} = this.props;

        if (!isAdmin) {
            this.error()
        } else {

            let id = match.params.id;

            if (!id) {
                id = 1
            }

            getStatusById(id)
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
        const {isAdmin} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            return (
                <DisplayDirectoryItem {...this.props}/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.STATUSES),
        currentItem: state.statusesDir.currentStatus,
        isFetching: state.statusesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default compose(
    connect(mapStateToProps, {
        getStatusById
    }),
    withRouter
)(DisplayStatusContainer);