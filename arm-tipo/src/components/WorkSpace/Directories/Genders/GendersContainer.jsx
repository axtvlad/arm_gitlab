import {connect} from "react-redux";
import React from "react";
import Genders from "./Genders";
import {getGenders} from "../../../../redux/Reducers/GenderReducer";
import {notification, Spin} from "antd";

class GendersContainer extends React.Component {
    componentDidMount() {
        const {isAdmin, genders, getGenders} = this.props;

        if (!isAdmin) {
            this.error()
        } else {
            !genders.length && getGenders();
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
        const {isAdmin, genders, isFetching} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            return (
                <Genders
                    isAdmin={isAdmin}
                    directory={genders}
                    isFetching={isFetching}
                />
            )
        }
    }
}

const mapStateToProps = (state) => {
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