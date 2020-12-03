import {connect} from "react-redux";
import AddStatus from "./AddStatus";
import {postStatus, updateStatusNameKz, updateStatusNameRu} from "../../../../redux/Reducers/StatusReducer";
import React from "react";
import {Redirect} from "react-router-dom";
import {notification, Spin} from "antd";

class AddStatusContainer extends React.Component {
    componentDidMount() {
        const {isAdmin} = this.props;

        if (!isAdmin) {
            this.error()
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
        const {isAdmin, statusesDir} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            if (statusesDir.isPosted) {
                return <Redirect to={'/statuses'}/>
            } else {
                return (
                    <AddStatus {...this.props} />
                )
            }
        }
    }
}

const MapStateToProps = (state) => {
    return {
        statusesDir: state.statusesDir,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(MapStateToProps,
    {
        postStatus,
        updateStatusNameRu,
        updateStatusNameKz,
    }
)(AddStatusContainer);