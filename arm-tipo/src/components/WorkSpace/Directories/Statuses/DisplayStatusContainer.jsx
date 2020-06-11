import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DisplayDirectoryItem from "../../../common/commonComponents/DisplayDirectoryItem";
import {DirectoriesTypes, GetDirectory} from "../../../common/utils/DirectoriesTypes";
import {getStatusById} from "../../../../redux/Reducers/StatusReducer";
import {notification, Spin} from "antd";

class DisplayStatusContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {

            let id = this.props.match.params.id;

            if (!id) {
                id = 1
            }

            this.props.getStatusById(id)
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
                <DisplayDirectoryItem {...this.props}/>
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        type: GetDirectory(DirectoriesTypes.STATUSES),
        currentItem: state.statusesDir.currentStatus,
        isFetching: state.statusesDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin
    }
};

let StatusContainerUrl = withRouter(DisplayStatusContainer);

export default connect(mapStateToProps,
    {
        getStatusById
    }
)(StatusContainerUrl)