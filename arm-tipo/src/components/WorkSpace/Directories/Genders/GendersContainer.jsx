import {connect} from "react-redux";
import React from "react";
import Genders from "./Genders";
import {getGenders} from "../../../../redux/Reducers/GenderReducer";
import {notification, Spin} from "antd";

class GendersContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAdmin) {
            this.error()
        } else {
            !this.props.genders.length && this.props.getGenders();
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
                <Genders
                    isAdmin={this.props.isAdmin}
                    directory={this.props.genders}
                    isFetching={this.props.isFetching}
                />
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        genders: state.gendersDir.genders,
        isFetching: state.gendersDir.isFetching,
        isAdmin: state.authDir.userData.isAdmin,
    }
};

export default connect(mapStateToProps,
    {
        getGenders
    }
)(GendersContainer);