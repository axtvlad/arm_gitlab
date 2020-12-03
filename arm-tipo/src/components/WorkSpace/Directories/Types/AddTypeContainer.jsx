import {postType, updateTypeNameKz, updateTypeNameRu} from "../../../../redux/Reducers/TypeReducer";
import {connect} from "react-redux";
import AddType from "./AddType";
import React from "react";
import {Redirect} from "react-router-dom";
import {notification, Spin} from "antd";

class AddTypeContainer extends React.Component {
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
        const {isAdmin, typesDir} = this.props;

        if (!isAdmin) {
            return <Spin/>
        } else {
            if (typesDir.isPosted) {
                return <Redirect to={'/types'}/>
            } else {
                return (
                    <AddType {...this.props}/>
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        typesDir: state.typesDir,
        isAdmin: state.authDir.userData.isAdmin
    }
};

export default connect(mapStateToProps,
    {
        postType,
        updateTypeNameRu,
        updateTypeNameKz,
    }
)(AddTypeContainer);
