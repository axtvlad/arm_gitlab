import {connect} from "react-redux";
import AddStatus from "./AddStatus";
import {postStatus, updateStatusNameKz, updateStatusNameRu} from "../../../../redux/Reducers/StatusReducer";
import React from "react";
import {Redirect} from "react-router-dom";
import {notification, Spin} from "antd";

class AddStatusContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
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
        if (!this.props.isAdmin) {
            return <Spin/>
        } else {
            if (this.props.statusesDir.isPosted) {
                return <Redirect to={'/statuses'}/>
            } else {
                return (
                    <AddStatus {...this.props} />
                )
            }
        }
    }
}

let MapStateToProps = (state) => {
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